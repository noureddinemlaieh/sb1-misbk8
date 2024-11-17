export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'LOST';
  source?: string;
  assignedTo: User;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Opportunity {
  id: string;
  title: string;
  value: number;
  status: 'NEW' | 'MEETING_SCHEDULED' | 'PROPOSAL_SENT' | 'NEGOTIATION' | 'WON' | 'LOST';
  client: Client;
  clientId: string;
  assignedTo: User;
  userId: string;
  createdAt: string;
  updatedAt: string;
}