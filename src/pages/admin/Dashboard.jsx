import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api } from '../../api/client';

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBlogs = () => {
    setLoading(true);
    api.blogs.getAll()
      .then(setBlogs)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadBlogs(); }, []);

  const deleteBlog = async (id) => {
    if (!confirm('Delete this blog?')) return;
    try {
      await api.blogs.delete(id);
      loadBlogs();
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleStatus = async (blog) => {
    try {
      await api.blogs.update(blog._id, { status: blog.status === 'published' ? 'draft' : 'published' });
      loadBlogs();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Hasini Bondada</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <Link
          to="/admin/blogs/new"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          New Blog
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-800/50 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-4">No blog posts yet.</p>
          <Link to="/admin/blogs/new" className="text-blue-400 hover:text-blue-300">Create your first blog post</Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-left text-sm text-gray-500">
                <th className="pb-3 font-medium">Title</th>
                <th className="pb-3 font-medium hidden md:table-cell">Status</th>
                <th className="pb-3 font-medium hidden md:table-cell">Date</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-b border-gray-800/50">
                  <td className="py-3">
                    <Link to={`/admin/blogs/${blog._id}`} className="text-white hover:text-blue-400 transition-colors">
                      {blog.title}
                    </Link>
                  </td>
                  <td className="py-3 hidden md:table-cell">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      blog.status === 'published'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    }`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-gray-500 hidden md:table-cell">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleStatus(blog)}
                        className="text-xs text-gray-500 hover:text-white transition-colors"
                      >
                        {blog.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <Link
                        to={`/admin/blogs/${blog._id}`}
                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteBlog(blog._id)}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </>
  );
}
