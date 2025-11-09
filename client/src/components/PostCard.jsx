import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={post.featuredImage || 'https://via.placeholder.com/400x200'}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center mb-2">
          {post.category && (
            <span
              className="px-3 py-1 text-xs font-semibold rounded-full text-white"
              style={{ backgroundColor: post.category.color }}
            >
              {post.category.name}
            </span>
          )}
        </div>
        <Link to={`/posts/${post.slug || post._id}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt || post.content.substring(0, 150) + '...'}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <img
              src={post.author?.avatar || 'https://via.placeholder.com/40'}
              alt={post.author?.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span>{post.author?.name}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>{formatDate(post.createdAt)}</span>
            <span>👁️ {post.viewCount || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;