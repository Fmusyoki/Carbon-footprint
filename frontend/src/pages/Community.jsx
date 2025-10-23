import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Base from "../components/Base";
import axios from "axios";

const BlogPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'sustainability',
    title: '',
    content: '',
    tags: ''
  });

  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/createblog", {name ,email,category, title, content, tags})
   
  };

  return (
    <Base>
      <div className="min-vh-100 bg-light">
        {/* Hero Section */}
        <section className="bg-success text-white py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h1 className="display-5 fw-bold mb-4">
                  Sustainability Blog & Community
                </h1>
                <p className="lead mb-4">
                  Share your eco-friendly journey, learn from others, and contribute to our growing community of climate-conscious individuals.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <button 
                    onClick={() => setShowForm(true)}
                    className="btn btn-light btn-lg px-4 py-2 fw-semibold"
                  >
                    Write a Blog Post →
                  </button>
                  <Link to="/community" className="btn btn-outline-light btn-lg px-4 py-2 fw-semibold">
                    Join Community
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 text-center">
                <div className="display-1">📝</div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Form Modal */}
        {showForm && (
          <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header bg-success text-white">
                  <h5 className="modal-title">Write a New Blog Post</h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white"
                    onClick={() => setShowForm(false)}
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Your Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Category *</label>
                        <select
                          className="form-select"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          required
                        >
                          <option value="sustainability">Sustainability</option>
                          <option value="energy">Energy</option>
                          <option value="transportation">Transportation</option>
                          <option value="food">Food</option>
                          <option value="lifestyle">Lifestyle</option>
                          <option value="technology">Technology</option>
                          <option value="policy">Policy</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Tags</label>
                        <input
                          type="text"
                          className="form-control"
                          name="tags"
                          value={formData.tags}
                          onChange={handleChange}
                          placeholder="e.g., carbon, recycling, solar"
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">Blog Title *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          required
                          placeholder="Enter an engaging title"
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">Content *</label>
                        <textarea
                          className="form-control"
                          name="content"
                          rows="8"
                          value={formData.content}
                          onChange={handleChange}
                          required
                          placeholder="Share your thoughts, experiences, and insights..."
                        ></textarea>
                        <div className="form-text">
                          Minimum 200 characters. Write about your sustainability journey, tips, or research.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-success"
                      disabled={formData.content.length < 200}
                    >
                      Publish Blog Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Section */}
        <section className="py-5">
          <div className="container">
            <div className="row mb-4">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className="fw-bold text-success">Community Blog Posts</h2>
                  <div className="d-flex gap-2">
                    <select className="form-select" style={{width: 'auto'}}>
                      <option>All Categories</option>
                      <option>Sustainability</option>
                      <option>Energy</option>
                      <option>Transportation</option>
                      <option>Food</option>
                      <option>Lifestyle</option>
                    </select>
                    <button 
                      onClick={() => setShowForm(true)}
                      className="btn btn-success"
                    >
                      + New Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Posts Grid */}
            {blogs.length > 0 ? (
              <div className="row g-4">
                {blogs.map((blog) => (
                  <div key={blog.id} className="col-lg-6">
                    <div className="card h-100 shadow-sm border-0">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <span className="badge bg-success">{blog.category}</span>
                          <small className="text-muted">{blog.readTime}</small>
                        </div>
                        <h5 className="card-title fw-bold text-dark">{blog.title}</h5>
                        <p className="card-text text-muted">{blog.content.substring(0, 150)}...</p>
                        <div className="mt-auto">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <small className="fw-semibold text-dark">{blog.author}</small>
                              <br />
                              <small className="text-muted">{new Date(blog.date).toLocaleDateString()}</small>
                            </div>
                            <button className="btn btn-outline-success btn-sm">
                              Read More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <div className="display-1 text-muted mb-3">📝</div>
                <h4 className="text-muted mb-3">No Blog Posts Yet</h4>
                <p className="text-muted mb-4">
                  Be the first to share your sustainability journey with our community.
                </p>
                <button 
                  onClick={() => setShowForm(true)}
                  className="btn btn-success btn-lg"
                >
                  Write Your First Post
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-5">
          <div className="container">
            <h3 className="text-center fw-bold mb-5">Why Share Your Story?</h3>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="text-center p-4">
                  <div className="text-success mb-3">
                    <i className="bi bi-people fs-1"></i>
                  </div>
                  <h5 className="fw-bold">Inspire Others</h5>
                  <p className="text-muted mb-0">
                    Your experiences can motivate others to adopt sustainable practices and make positive changes.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center p-4">
                  <div className="text-success mb-3">
                    <i className="bi bi-lightbulb fs-1"></i>
                  </div>
                  <h5 className="fw-bold">Share Knowledge</h5>
                  <p className="text-muted mb-0">
                    Help others learn from your successes and challenges in reducing carbon footprint.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center p-4">
                  <div className="text-success mb-3">
                    <i className="bi bi-heart fs-1"></i>
                  </div>
                  <h5 className="fw-bold">Build Community</h5>
                  <p className="text-muted mb-0">
                    Connect with like-minded individuals passionate about environmental conservation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-light py-5">
          <div className="container text-center">
            <h3 className="fw-bold mb-3">Ready to Share Your Story?</h3>
            <p className="text-muted mb-4">
              Join our community of climate advocates and inspire others with your sustainability journey.
            </p>
            <button 
              onClick={() => setShowForm(true)}
              className="btn btn-success btn-lg px-5"
            >
              Start Writing
            </button>
          </div>
        </section>
      </div>
    </Base>
  );
};

export default BlogPage;