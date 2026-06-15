import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api } from '../../api/client';
import MarkdownRenderer from '../../components/MarkdownRenderer';

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    tags: '',
    category: '',
    status: 'draft',
    coverImage: '',
  });
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.categories.list().then(setCategories).catch(() => {});
    if (isEdit) {
      api.blogs.getById(id).then((blog) => {
        if (blog) {
          setForm({
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt,
            content: blog.content,
            tags: blog.tags?.join(', ') || '',
            category: blog.category?._id || '',
            status: blog.status,
            coverImage: blog.coverImage || '',
          });
        }
      }).catch(() => {});
    }
  }, [id, isEdit]);

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: isEdit ? prev.slug : generateSlug(value),
    }));
  };

  const handleSubmit = async (e, status) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const data = {
      ...form,
      category: form.category || null,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      status,
    };

    try {
      if (isEdit) {
        await api.blogs.update(id, data);
      } else {
        await api.blogs.create(data);
      }
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isEdit ? 'Edit Blog' : 'New Blog'} | Admin | Hasini Bondada</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div>
        <h1 className="text-2xl font-bold text-white mb-8">{isEdit ? 'Edit Blog' : 'New Blog'}</h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div>
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                required
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                required
                rows={2}
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">None</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="AI, React, Python"
                  className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Content (Markdown)</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
                rows={20}
                className="markdown-editor font-mono"
                placeholder="Write your blog content in Markdown..."
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="flex gap-3">
              <button
                type="submit"
                onClick={(e) => handleSubmit(e, 'published')}
                disabled={saving}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              >
                {saving ? 'Saving...' : 'Publish'}
              </button>
              <button
                type="submit"
                onClick={(e) => handleSubmit(e, 'draft')}
                disabled={saving}
                className="px-6 py-2.5 border border-gray-700 hover:border-gray-500 text-gray-300 rounded-lg font-medium transition-colors"
              >
                Save Draft
              </button>
            </div>
          </form>
        </div>

        <div className="hidden xl:block">
          <div className="sticky top-24">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Preview</h3>
            <div className="border border-gray-800 rounded-lg p-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
              {form.content ? (
                <MarkdownRenderer content={form.content} />
              ) : (
                <p className="text-gray-600 text-sm">Start writing to see preview...</p>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
