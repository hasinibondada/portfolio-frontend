import { useState, useEffect } from 'react';
import { api } from '../api/client';
import CategoryTree from './CategoryTree';
import { buildCategoryTree } from '../utils/categoryTree';

export default function BlogSidebar({ currentSlug }) {
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    api.categories.list().then(setCategories).catch(() => {});
    api.blogs.list({ limit: 50 }).then((data) => {
      setBlogs((data.blogs || []).filter((b) => b.slug !== currentSlug));
    }).catch(() => {});
  }, [currentSlug]);

  const blogsByCategory = {};
  blogs.forEach((b) => {
    if (b.category) {
      const catId = b.category._id || b.category;
      if (!blogsByCategory[catId]) blogsByCategory[catId] = [];
      blogsByCategory[catId].push(b);
    }
  });

  const categoryTree = buildCategoryTree(categories);

  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Categories
        </h4>
        <CategoryTree
          categories={categoryTree}
          showBlogs={true}
          blogsByCategory={blogsByCategory}
        />
      </div>
    </div>
  );
}
