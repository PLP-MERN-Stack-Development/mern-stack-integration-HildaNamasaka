import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePost } from '../hooks/usePosts';
import { postService } from '../services/api';
import PostForm from '../components/PostForm';
import Loading from '../components/Loading';
import Error from '../components/Error';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { post, loading, error } = usePost(id);
  const [isLoading, setIsLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setUpdateError(null);
      const response = await postService.updatePost(id, formData);
      navigate(`/posts/${response.data.slug || response.data._id}`);
    } catch (err) {
      setUpdateError(err.response?.data?.error || 'Failed to update post');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!post) return <Error message="Post not found" />;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Post</h1>

          {updateError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{updateError}</p>
            </div>
          )}

          <PostForm
            initialData={post}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default EditPost;