import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePost } from '../hooks/usePosts';
import { useAuth } from '../context/AuthContext';
import { postService } from '../services/api';
import Loading from '../components/Loading';
import Error from '../components/Error';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { post, loading, error, refetch } = usePost(id);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postService.deletePost(post._id);
        navigate('/');
      } catch (err) {
        alert('Failed to delete post');
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setIsSubmitting(true);
      await postService.addComment(post._id, { content: comment });
      setComment('');
      refetch();
    } catch (err) {
      alert('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={refetch} />;
  if (!post) return <Error message="Post not found" />;

  const isAuthor = user && post.author && user.id === post.author._id;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Post Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <img
            src={post.featuredImage || 'https://via.placeholder.com/800x400'}
            alt={post.title}
            className="w-full h-96 object-cover"
          />
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span
                className="px-4 py-2 text-sm font-semibold rounded-full text-white"
                style={{ backgroundColor: post.category?.color }}
              >
                {post.category?.name}
              </span>
              {isAuthor && (
                <div className="flex space-x-2">
                  <Link
                    to={`/edit-post/${post._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            <div className="flex items-center mb-6">
              <img
                src={post.author?.avatar || 'https://via.placeholder.com/50'}
                alt={post.author?.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-gray-900 font-medium">{post.author?.name}</p>
                <p className="text-gray-500 text-sm">
                  {formatDate(post.createdAt)} • {post.viewCount} views
                </p>
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Comments ({post.comments?.length || 0})
          </h2>

          {/* Add Comment Form */}
          {isAuthenticated ? (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <div className="mb-8 bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600">
                Please{' '}
                <Link to="/login" className="text-blue-600 hover:underline">
                  login
                </Link>{' '}
                to leave a comment
              </p>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment._id} className="flex space-x-4">
                  <img
                    src={comment.user?.avatar || 'https://via.placeholder.com/40'}
                    alt={comment.user?.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium text-gray-900">
                        {comment.user?.name}
                      </p>
                      <p className="text-gray-700 mt-1">{comment.content}</p>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;