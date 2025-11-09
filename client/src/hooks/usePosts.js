import { useState, useEffect } from 'react';
import { postService } from '../services/api';

export const usePosts = (page = 1, limit = 10, category = null) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  });

  useEffect(() => {
    fetchPosts();
  }, [page, limit, category]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await postService.getAllPosts(page, limit, category);
      setPosts(data.data);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        total: data.total,
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchPosts();
  };

  return { posts, loading, error, pagination, refetch };
};

export const usePost = (idOrSlug) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (idOrSlug) {
      fetchPost();
    }
  }, [idOrSlug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await postService.getPost(idOrSlug);
      setPost(data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchPost();
  };

  return { post, loading, error, refetch };
};