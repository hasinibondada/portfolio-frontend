import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { api } from '../../api/client';
import { buildCategoryTree } from '../../utils/categoryTree';

function CategoryTreeNode({ node, onEdit, onDelete, allCategories }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 py-1.5">
        {node.depth > 0 && (
          <span className="text-gray-600 shrink-0">
            {'| '.repeat(node.depth)}
          </span>
        )}
        <span className="text-gray-600 shrink-0 mr-1">&#x2514;</span>
        <span className="text-sm text-white font-medium">{node.name}</span>
        <span className="text-xs text-gray-600 ml-1">({node.slug})</span>
        <div className="ml-auto flex gap-2 shrink-0">
          <button onClick={() => onEdit(node)} className="text-xs text-blue-400 hover:text-blue-300">Edit</button>
          <button onClick={() => onDelete(node._id)} className="text-xs text-red-400 hover:text-red-300">Delete</button>
        </div>
      </div>
      {node.children.length > 0 && (
        <div className="ml-5 border-l border-gray-800 pl-3">
          {node.children.map((child) => (
            <CategoryTreeNode key={child._id} node={child} onEdit={onEdit} onDelete={onDelete} allCategories={allCategories} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [parent, setParent] = useState('');
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCategories = () => {
    setLoading(true);
    api.categories.list()
      .then(setCategories)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadCategories(); }, []);

  const generateSlug = (value) => {
    setSlug(value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.categories.update(editing, { name, slug, parent: parent || null });
      } else {
        await api.categories.create({ name, slug, parent: parent || null });
      }
      setName('');
      setSlug('');
      setParent('');
      setEditing(null);
      loadCategories();
    } catch (err) {
      alert(err.message);
    }
  };

  const startEdit = (node) => {
    setEditing(node._id);
    setName(node.name);
    setSlug(node.slug);
    setParent(node.parent?._id || '');
  };

  const deleteCat = async (id) => {
    if (!confirm('Delete this category?')) return;
    try {
      await api.categories.delete(id);
      loadCategories();
    } catch (err) {
      alert(err.message);
    }
  };

  const categoryTree = buildCategoryTree(categories);

  return (
    <>
      <Helmet>
        <title>Categories | Admin | Hasini Bondada</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div>
        <h1 className="text-2xl font-bold text-white mb-8">Categories</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-xl bg-gray-900/50 border border-gray-800">
            <h2 className="text-lg font-semibold text-white">{editing ? 'Edit Category' : 'New Category'}</h2>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); if (!editing) generateSlug(e.target.value); }}
                required
                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Parent Category</label>
              <select
                value={parent}
                onChange={(e) => setParent(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">None (Top Level)</option>
                {categories.filter((c) => c._id !== editing).map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
                {editing ? 'Update' : 'Create'}
              </button>
              {editing && (
                <button type="button" onClick={() => { setEditing(null); setName(''); setSlug(''); setParent(''); }} className="px-4 py-2 border border-gray-700 text-gray-400 rounded-lg text-sm transition-colors">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Category Structure</h3>
          {loading ? (
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-800/50 rounded animate-pulse" />
              ))}
            </div>
          ) : categoryTree.length === 0 ? (
            <p className="text-gray-500">No categories yet.</p>
          ) : (
            <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800">
              {categoryTree.map((node) => (
                <CategoryTreeNode key={node._id} node={node} onEdit={startEdit} onDelete={deleteCat} allCategories={categories} />
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
}
