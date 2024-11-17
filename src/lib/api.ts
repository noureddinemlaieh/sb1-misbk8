import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Une erreur est survenue');
  }
  return response.json();
}

export async function fetchApi(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem('auth_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers,
  });

  return handleResponse(response);
}

export const api = {
  get: (endpoint: string) => fetchApi(endpoint),
  post: (endpoint: string, data: any) =>
    fetchApi(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  put: (endpoint: string, data: any) =>
    fetchApi(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (endpoint: string) =>
    fetchApi(endpoint, {
      method: 'DELETE',
    }),
};