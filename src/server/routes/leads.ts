import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

const LeadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST']),
  source: z.string().optional(),
  userId: z.string(),
});

// Get all leads
router.get('/', async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        assignedTo: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching leads' });
  }
});

// Get single lead
router.get('/:id', async (req, res) => {
  try {
    const lead = await prisma.lead.findUnique({
      where: { id: req.params.id },
      include: {
        assignedTo: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching lead' });
  }
});

// Create lead
router.post('/', async (req, res) => {
  try {
    const validatedData = LeadSchema.parse(req.body);
    const lead = await prisma.lead.create({
      data: validatedData,
      include: {
        assignedTo: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
    res.status(201).json(lead);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Error creating lead' });
  }
});

// Update lead
router.put('/:id', async (req, res) => {
  try {
    const validatedData = LeadSchema.parse(req.body);
    const lead = await prisma.lead.update({
      where: { id: req.params.id },
      data: validatedData,
      include: {
        assignedTo: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
    res.json(lead);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Error updating lead' });
  }
});

// Convert lead to client
router.post('/:id/convert', async (req, res) => {
  const { id } = req.params;
  
  try {
    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    // Start a transaction to convert lead to client
    const result = await prisma.$transaction(async (prisma) => {
      // Create new client
      const client = await prisma.client.create({
        data: {
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
        },
      });

      // Update lead status
      await prisma.lead.update({
        where: { id },
        data: { status: 'CONVERTED' },
      });

      return client;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error converting lead' });
  }
});

// Delete lead
router.delete('/:id', async (req, res) => {
  try {
    await prisma.lead.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting lead' });
  }
});

export default router;