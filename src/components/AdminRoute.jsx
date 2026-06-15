import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function AdminLayout() {
  const { logout } = useAuth();
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/blogs/new', label: 'New Blog' },
    { to: '/admin/categories', label: 'Categories' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 border-r border-gray-800 transform transition-transform lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <Link to="/admin" className="text-lg font-bold text-white">Admin</Link>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                pathname === to ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {label}
            </Link>
          ))}
          <button onClick={logout} className="w-full text-left px-4 py-2 rounded-lg text-sm text-red-400 hover:bg-gray-800 transition-colors">
            Logout
          </button>
        </nav>
      </aside>

      <div className="flex-1">
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6 lg:px-8">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <a href="/" className="text-sm text-gray-500 hover:text-white transition-colors">View Site</a>
        </header>
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;
  return <AdminLayout />;
}
