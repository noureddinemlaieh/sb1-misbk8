import React, { useState, useEffect } from 'react';

interface Client {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [newClient, setNewClient] = useState<Omit<Client, 'id'>>({ name: '', email: '', phone: '' });
  const [error, setError] = useState<string | null>(null);

  // Fetch clients from the API
  useEffect(() => {
    fetch('/api/clients')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch clients');
        return response.json();
      })
      .then((data) => setClients(data))
      .catch((error) => setError(error.message));
  }, []);

  // Handle input changes for the new client form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClient((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new client to the API
  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newClient),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to add client');
        return response.json();
      })
      .then((newClient) => {
        setClients((prev) => [...prev, newClient]);
        setNewClient({ name: '', email: '', phone: '' });
        setError(null);
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div>
      <h1>Clients</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleAddClient}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newClient.name}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={newClient.email}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={newClient.phone || ''}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit">Add Client</button>
      </form>

      <h2>Client List</h2>
      {clients.length > 0 ? (
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              {client.name} - {client.email} {client.phone && `(${client.phone})`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No clients found.</p>
      )}
    </div>
  );
};

export default Clients;
