import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

const OpportunitySchema = z.object({
  title: z.string().min(1),
  value: z.number().positive(),
  status: z.enum(['NEW', 'MEETING_SCHEDULED', 'PROPOSAL_SENT', 'NEGOTIATION', 'WON', 'LOST']),
  clientId: z.string(),
  userId: z.string(),
});

// Get all opportunities
router.get('/', async (req, res) => {
  try {
    const opportunities = await prisma.opportunity.findMany({
      include: {
        client: true,
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
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching opportunities' });
  }
});

// Get single opportunity
router.get('/:id', async (req, res) => {
  try {
    const opportunity = await prisma.opportunity.findUnique({
      where: { id: req.params.id },
      include: {
        client: true,
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
    if (!opportunity) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }
    res.json(opportunity);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching opportunity' });
  }
});

// Create opportunity
router.post('/', async (req, res) => {
  try {
    const validatedData = OpportunitySchema.parse(req.body);
    const opportunity = await prisma.opportunity.create({
      data: validatedData,
      include: {
        client: true,
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
    res.status(201).json(opportunity);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Error creating opportunity' });
  }
});

// Update opportunity
router.put('/:id', async (req, res) => {
  try {
    const validatedData = OpportunitySchema.parse(req.body);
    const opportunity = await prisma.opportunity.update({
      where: { id: req.params.id },
      data: validatedData,
      include: {
        client: true,
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
    res.json(opportunity);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Error updating opportunity' });
  }
});

// Mark opportunity as won
router.post('/:id/win', async (req, res) => {
  try {
    const opportunity = await prisma.opportunity.update({
      where: { id: req.params.id },
      data: { status: 'WON' },
      include: {
        client: true,
        assignedTo: true,
      },
    });
    res.json(opportunity);
  } catch (error) {
    res.status(500).json({ error: 'Error updating opportunity status' });
  }
});

// Delete opportunity
router.delete('/:id', async (req, res) => {
  try {
    await prisma.opportunity.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting opportunity' });
  }
});

export default router;