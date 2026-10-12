import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'university-backend-kappa.vercel.app';
// "http://localhost:5000/api/v1";

export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; message?: string; data?: T; errors?: any[]; meta?: any }> {
  const token = Cookies.get('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  const data = await res.json().catch(() => ({
    success: false,
    message: 'Server error parsing JSON response',
  }));

  if (!res.ok && !data.message) {
    data.message = `HTTP Error ${res.status}`;
  }

  return data;
}
