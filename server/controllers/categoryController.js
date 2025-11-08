// categoryController.js - Categories controller

const Category = require('../models/Category');
const Post = require('../models/Post');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });

    // Get post count for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const postCount = await Post.countDocuments({ category: category._id });
        return {
          ...category.toObject(),
          postCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categoriesWithCount,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message || 'Server Error',
    });
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
exports.getCategory = async (req, res) => {
  try {
    let category;

    // Check if parameter is MongoDB ObjectId or slug
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      category = await Category.findById(req.params.id);
    } else {
      category = await Category.findOne({ slug: req.params.id });
    }

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found',
      });
    }

    // Get posts in this category
    const posts = await Post.find({ category: category._id })
      .populate('author', 'name email avatar')
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        category,
        posts,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message || 'Server Error',
    });
  }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private (Admin only)
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (err) {
    // Handle duplicate key error
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Category with this name already exists',
      });
    }

    res.status(500).json({
      success: false,
      error: err.message || 'Server Error',
    });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (Admin only)
exports.updateCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found',
      });
    }

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message || 'Server Error',
    });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (Admin only)
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found',
      });
    }

    // Check if category has posts
    const postCount = await Post.countDocuments({ category: category._id });
    
    if (postCount > 0) {
      return res.status(400).json({
        success: false,
        error: `Cannot delete category. It has ${postCount} post(s) associated with it.`,
      });
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message || 'Server Error',
    });
  }
};