const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const api = {
  auth: {
    login: (username, password) =>
      request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
    verify: () => request('/auth/verify'),
  },
  blogs: {
    list: (params = {}) => {
      const q = new URLSearchParams(params).toString();
      return request(`/blogs${q ? `?${q}` : ''}`);
    },
    getAll: () => request('/blogs/all'),
    getById: (id) => request(`/blogs/by-id/${id}`),
    get: (slug) => request(`/blogs/${slug}`),
    create: (data) => request('/blogs', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/blogs/${id}`, { method: 'DELETE' }),
  },
  categories: {
    list: () => request('/categories'),
    create: (data) => request('/categories', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/categories/${id}`, { method: 'DELETE' }),
  },
  projects: {
    list: () => request('/projects'),
  },
  contact: {
    send: (data) => request('/contact', { method: 'POST', body: JSON.stringify(data) }),
  },
};
