// seed.js - Script to seed the database with initial data

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Category = require('./models/Category');
const Post = require('./models/Post');

dotenv.config();

// Sample data
const categories = [
  { name: 'Technology', description: 'Tech related posts', color: '#3B82F6' },
  { name: 'Lifestyle', description: 'Life and style posts', color: '#10B981' },
  { name: 'Travel', description: 'Travel and adventure', color: '#F59E0B' },
  { name: 'Food', description: 'Food and recipes', color: '#EF4444' },
  { name: 'Business', description: 'Business and entrepreneurship', color: '#8B5CF6' },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Post.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('Created admin user');

    // Create regular user
    const regularUser = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user',
    });
    console.log('Created regular user');

    // Create categories one by one to trigger pre-save middleware
    const createdCategories = [];
    for (const categoryData of categories) {
      const category = await Category.create(categoryData);
      createdCategories.push(category);
    }
    console.log('Created categories');

    // Create sample posts with slugs already provided
    const samplePostsData = [
      {
        title: 'Getting Started with MERN Stack',
        slug: 'getting-started-with-mern-stack',
        content: 'The MERN stack is a popular choice for building full-stack web applications. It consists of MongoDB, Express.js, React, and Node.js. In this post, we will explore how to set up a basic MERN application from scratch. We will cover setting up the backend with Express and MongoDB, creating a REST API, and building a React frontend that consumes this API. By the end of this tutorial, you will have a solid foundation for building your own MERN applications.',
        excerpt: 'Learn how to build full-stack applications with MongoDB, Express, React, and Node.js',
        author: adminUser._id,
        category: createdCategories[0]._id,
        tags: ['javascript', 'react', 'nodejs', 'mongodb'],
        isPublished: true,
        featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
      },
      {
        title: '10 Tips for a Healthier Lifestyle',
        slug: '10-tips-for-a-healthier-lifestyle',
        content: 'Living a healthy lifestyle doesn\'t have to be complicated. Here are 10 simple tips that can help you improve your overall wellbeing: 1. Drink plenty of water throughout the day. 2. Get at least 7-8 hours of sleep each night. 3. Exercise regularly, even if it\'s just a 30-minute walk. 4. Eat a balanced diet with plenty of fruits and vegetables. 5. Practice mindfulness and meditation. 6. Limit your screen time before bed. 7. Stay connected with friends and family. 8. Take breaks during work. 9. Learn something new regularly. 10. Don\'t forget to laugh and have fun!',
        excerpt: 'Simple and effective tips to improve your daily health and wellness',
        author: regularUser._id,
        category: createdCategories[1]._id,
        tags: ['health', 'wellness', 'lifestyle'],
        isPublished: true,
        featuredImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
      },
      {
        title: 'Top 5 Destinations for 2024',
        slug: 'top-5-destinations-for-2024',
        content: 'Planning your next adventure? Here are the top 5 travel destinations you should consider for 2024. From pristine beaches to historic cities, these locations offer unique experiences for every type of traveler. Number one on our list is Iceland, with its stunning natural landscapes and the magical Northern Lights. Second is Japan, where ancient traditions meet cutting-edge technology. Third is Portugal, offering beautiful coastlines and rich history. Fourth is New Zealand, a paradise for adventure seekers. And fifth is Morocco, with its vibrant culture and stunning architecture.',
        excerpt: 'Discover the most exciting travel destinations for your next vacation',
        author: adminUser._id,
        category: createdCategories[2]._id,
        tags: ['travel', 'adventure', 'destinations'],
        isPublished: true,
        featuredImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
      },
      {
        title: 'The Ultimate Guide to Italian Pasta',
        slug: 'the-ultimate-guide-to-italian-pasta',
        content: 'Italian pasta is more than just a dish - it\'s a culinary art form that has been perfected over centuries. In this comprehensive guide, we\'ll explore the different types of pasta, the best sauces to pair with each type, and authentic cooking techniques. From classic Carbonara to rich Bolognese, you\'ll learn how to create restaurant-quality pasta dishes at home. We\'ll also cover the importance of using quality ingredients, proper cooking times, and presentation tips that will impress your dinner guests.',
        excerpt: 'Master the art of cooking authentic Italian pasta dishes',
        author: regularUser._id,
        category: createdCategories[3]._id,
        tags: ['food', 'cooking', 'italian', 'recipes'],
        isPublished: true,
        featuredImage: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
      },
      {
        title: 'Building a Successful Startup in 2024',
        slug: 'building-a-successful-startup-in-2024',
        content: 'Starting a business in today\'s competitive landscape requires more than just a great idea. In this article, we discuss the key elements of building a successful startup in 2024. We cover market research, finding your target audience, creating a minimum viable product (MVP), securing funding, building a strong team, and scaling your business. We also share insights from successful entrepreneurs and lessons learned from failed startups. Whether you\'re a first-time founder or a serial entrepreneur, this guide will help you navigate the challenges of building a startup.',
        excerpt: 'Essential strategies for launching and growing your startup',
        author: adminUser._id,
        category: createdCategories[4]._id,
        tags: ['business', 'startup', 'entrepreneurship'],
        isPublished: true,
        featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
      },
      {
        title: 'Understanding React Hooks',
        slug: 'understanding-react-hooks',
        content: 'React Hooks revolutionized the way we write React components. In this tutorial, we\'ll dive deep into the most commonly used hooks: useState, useEffect, useContext, useReducer, and custom hooks. We\'ll explore real-world examples and best practices for each hook. You\'ll learn when to use each hook, common pitfalls to avoid, and how to create your own custom hooks to share logic across components. By the end of this guide, you\'ll be comfortable using hooks in your React applications.',
        excerpt: 'A comprehensive guide to React Hooks and their practical applications',
        author: regularUser._id,
        category: createdCategories[0]._id,
        tags: ['react', 'javascript', 'hooks', 'frontend'],
        isPublished: true,
        featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      },
    ];

    // Create posts one by one
    const createdPosts = [];
    for (const postData of samplePostsData) {
      const post = await Post.create(postData);
      createdPosts.push(post);
    }
    console.log('Created sample posts');

    // Add some comments to posts
    await Post.findByIdAndUpdate(createdPosts[0]._id, {
      $push: {
        comments: {
          user: regularUser._id,
          content: 'Great article! Very helpful for beginners.',
        },
      },
    });

    console.log('\n Database seeded successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin - Email: admin@example.com, Password: admin123');
    console.log('User - Email: john@example.com, Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();