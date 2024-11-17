import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

const ClientSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

// Get all clients
router.get('/', async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      include: {
        opportunities: true,
        appointments: true,
        invoices: true,
      },
    });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching clients' });
  }
});

// Get single client
router.get('/:id', async (req, res) => {
  try {
    const client = await prisma.client.findUnique({
      where: { id: req.params.id },
      include: {
        opportunities: true,
        appointments: true,
        invoices: true,
      },
    });
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching client' });
  }
});

// Create client
router.post('/', async (req, res) => {
  try {
    const validatedData = ClientSchema.parse(req.body);
    const client = await prisma.client.create({
      data: validatedData,
    });
    res.status(201).json(client);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Error creating client' });
  }
});

// Update client
router.put('/:id', async (req, res) => {
  try {
    const validatedData = ClientSchema.parse(req.body);
    const client = await prisma.client.update({
      where: { id: req.params.id },
      data: validatedData,
    });
    res.json(client);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Error updating client' });
  }
});

// Delete client
router.delete('/:id', async (req, res) => {
  try {
    await prisma.client.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting client' });
  }
});

export default router;