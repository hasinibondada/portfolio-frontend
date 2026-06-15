import { Link } from 'react-router-dom';

const MAX_RENDER_DEPTH = 20;

function TreeBranch({ node, linkTo, showBlogs, blogsByCategory }) {
  const nodeBlogs = showBlogs && blogsByCategory ? (blogsByCategory[node._id] || []) : [];

  if (node.depth >= MAX_RENDER_DEPTH) return null;

  return (
    <div>
      <div className="flex items-center gap-1.5">
        {node.depth > 0 && (
          <span className="text-gray-600 shrink-0" style={{ paddingLeft: `${(node.depth - 1) * 20}px` }}>
            {'| '.repeat(node.depth)}
          </span>
        )}
        <span className="text-gray-600 shrink-0">&#x2514;</span>
        <div className="flex items-center gap-2 w-full min-w-0">
          {linkTo ? (
            <Link
              to={`${linkTo}${node._id}`}
              className="text-sm text-gray-500 hover:text-white transition-colors truncate"
            >
              {node.name}
            </Link>
          ) : (
            <span className="text-sm text-gray-300 truncate">{node.name}</span>
          )}
        </div>
      </div>

      {nodeBlogs.length > 0 && (
        <div className="ml-6 border-l border-gray-800 pl-4 space-y-1 mt-1 mb-1">
          {nodeBlogs.map((blog) => (
            <div key={blog._id} className="flex items-center gap-1.5">
              <span className="text-gray-600">&#x2514;</span>
              <Link
                to={`/blog/${blog.slug}`}
                className="text-sm text-gray-500 hover:text-blue-400 transition-colors truncate"
              >
                {blog.title}
              </Link>
            </div>
          ))}
        </div>
      )}

      {node.children.length > 0 && (
        <div className="ml-4 border-l border-gray-800 pl-2 space-y-1 mt-1">
          {node.children.map((child) => (
            <TreeBranch
              key={child._id}
              node={child}
              linkTo={linkTo}
              showBlogs={showBlogs}
              blogsByCategory={blogsByCategory}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CategoryTree({
  categories,
  linkTo = '/blog?category=',
  showBlogs = false,
  blogsByCategory,
  showAllLink = true,
}) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="space-y-1">
      {showAllLink && linkTo && (
        <Link
          to="/blog"
          className="block text-sm text-gray-500 hover:text-white transition-colors mb-2"
        >
          All Posts
        </Link>
      )}
      {categories.map((node) => (
        <TreeBranch
          key={node._id}
          node={node}
          linkTo={linkTo}
          showBlogs={showBlogs}
          blogsByCategory={blogsByCategory}
        />
      ))}
    </div>
  );
}
