import express from 'express';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import clientRoutes from './routes/clients';
import leadRoutes from './routes/leads';
import opportunityRoutes from './routes/opportunities';
import appointmentRoutes from './routes/appointments';
import invoiceRoutes from './routes/invoices';
import messageRoutes from './routes/messages';
import documentRoutes from './routes/documents';
import { authenticateToken } from './middleware/auth';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/clients', authenticateToken, clientRoutes);
app.use('/api/leads', authenticateToken, leadRoutes);
app.use('/api/opportunities', authenticateToken, opportunityRoutes);
app.use('/api/appointments', authenticateToken, appointmentRoutes);
app.use('/api/invoices', authenticateToken, invoiceRoutes);
app.use('/api/messages', authenticateToken, messageRoutes);
app.use('/api/documents', authenticateToken, documentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});