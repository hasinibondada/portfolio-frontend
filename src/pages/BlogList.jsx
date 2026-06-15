import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api } from '../api/client';
import BlogCard from '../components/BlogCard';
import CategoryTree from '../components/CategoryTree';
import { buildCategoryTree } from '../utils/categoryTree';

export default function BlogList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const category = searchParams.get('category') || '';
  const tag = searchParams.get('tag') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';
  const page = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    api.categories.list().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = { page, limit: 9 };
    if (category) params.category = category;
    if (tag) params.tag = tag;
    if (search) params.search = search;
    if (sort) params.sort = sort;

    api.blogs.list(params)
      .then((data) => {
        setBlogs(data.blogs);
        setTotal(data.total);
      })
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, [category, tag, search, sort, page]);

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    if (key !== 'page') params.delete('page');
    setSearchParams(params);
  };

  const totalPages = Math.ceil(total / 9);
  const categoryTree = buildCategoryTree(categories);

  return (
    <>
      <Helmet>
        <title>Blog | Hasini Bondada</title>
        <meta name="description" content="Read blog posts about software engineering, full stack development, AI/ML, and cybersecurity by Hasini Bondada." />
        <meta property="og:title" content="Blog | Hasini Bondada" />
        <meta property="og:description" content="Read blog posts about software engineering, full stack development, AI/ML, and cybersecurity." />
        <meta property="og:url" content="https://hasinibondada25.vercel.app/blog" />
        <link rel="canonical" href="https://hasinibondada25.vercel.app/blog" />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Blog</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => updateParam('search', e.target.value)}
          className="flex-1 px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <select
          value={category}
          onChange={(e) => updateParam('category', e.target.value)}
          className="px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.parent ? `  ${cat.name}` : cat.name}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-blue-500"
        >
          <option value="">Oldest First</option>
          <option value="latest">Latest</option>
          <option value="mostRead">Most Read</option>
        </select>
      </div>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Categories
            </h4>
            <CategoryTree categories={categoryTree} showBlogs={false} />
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-800/50 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No blog posts found.</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  {page > 1 && (
                    <button onClick={() => updateParam('page', String(page - 1))} className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-colors">
                      Previous
                    </button>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => updateParam('page', String(p))}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        p === page ? 'bg-blue-600 text-white' : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  {page < totalPages && (
                    <button onClick={() => updateParam('page', String(page + 1))} className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-colors">
                      Next
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
