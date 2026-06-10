import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api } from '../api/client';
import MarkdownRenderer from '../components/MarkdownRenderer';
import TableOfContents from '../components/TableOfContents';
import BlogSidebar from '../components/BlogSidebar';

export default function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.blogs.get(slug)
      .then(setBlog)
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="h-8 w-2/3 bg-gray-800/50 rounded animate-pulse mb-4" />
        <div className="h-4 w-1/4 bg-gray-800/50 rounded animate-pulse mb-8" />
        <div className="space-y-3">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-800/50 rounded animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
          ))}
        </div>
      </div>
    );
  }

  if (!blog) {
    return <Navigate to="/not-found" replace />;
  }

  const blogTitle = blog?.title || 'Blog Post';
  const blogDesc = blog?.excerpt || 'Read this blog post by Hasini Bondada.';
  const blogUrl = `https://hasinibondada25.vercel.app/blog/${blog?.slug || ''}`;

  return (
    <>
      <Helmet>
        <title>{blogTitle} | Hasini Bondada</title>
        <meta name="description" content={blogDesc} />
        <meta name="keywords" content={(blog?.tags || []).join(', ')} />
        <meta property="og:title" content={`${blogTitle} | Hasini Bondada`} />
        <meta property="og:description" content={blogDesc} />
        <meta property="og:url" content={blogUrl} />
        <link rel="canonical" href={blogUrl} />
        <meta name="twitter:title" content={`${blogTitle} | Hasini Bondada`} />
        <meta name="twitter:description" content={blogDesc} />
      </Helmet>
      <article className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          {blog.category && (
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {blog.category.name}
            </span>
          )}
          <span>{blog.readingTime} min read</span>
          <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{blog.title}</h1>
        <p className="text-lg text-gray-400">{blog.excerpt}</p>
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {blog.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-400">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24">
            <BlogSidebar currentSlug={slug} />
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <MarkdownRenderer content={blog.content} />
        </div>

        <aside className="hidden xl:block w-56 shrink-0">
          <div className="sticky top-24 space-y-6">
            <TableOfContents content={blog.content} />
            <div className="pt-4 border-t border-gray-800">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                Back to top
              </button>
            </div>
          </div>
        </aside>
      </div>
    </article>
    </>
  );
}
