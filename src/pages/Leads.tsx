
import React, { useEffect, useState } from 'react';

type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
};

function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leads')
      .then((response) => response.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching leads:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading leads...</p>;
  }

  return (
    <div>
      <h1>Leads</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.id}</td>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leads;
