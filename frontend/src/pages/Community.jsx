import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Base from "../components/Base";
import axios from "axios";

const BlogPage = () => {

  return (
    <Base>
      <div className="min-vh-100 bg-light">
        {/* Hero Section - Updated */}
        <section className="bg-success text-white py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <span className="badge bg-warning text-dark fs-6">Community Features Coming Soon</span>
                </div>
                <h1 className="display-5 fw-bold mb-4">
                  Sustainability Community Hub
                </h1>
                <p className="lead mb-4">
                  We're building an amazing community space where you can share your eco-friendly journey, learn from others, and connect with climate-conscious individuals. Stay tuned!
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <button 
                    onClick={() => setShowForm(true)}
                    className="btn btn-light btn-lg px-4 py-2 fw-semibold"
                    disabled
                  >
                    ✨ Write a Blog Post (Coming Soon)
                  </button>
                  <button className="btn btn-outline-light btn-lg px-4 py-2 fw-semibold" disabled>
                    👥 Join Community (Coming Soon)
                  </button>
                </div>
              </div>
              <div className="col-lg-4 text-center">
                <div className="display-1">🚧</div>
                <p className="text-warning fw-semibold mt-2">Under Construction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Features */}
        <section className="py-5">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold text-success mb-3">Exciting Community Features Coming Your Way</h2>
              <p className="text-muted lead">We're working hard to bring you these amazing features</p>
            </div>
            
            <div className="row g-4">
              {/* Feature 1 */}
              <div className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100 bg-warning bg-opacity-10">
                  <div className="card-body text-center p-4">
                    <div className="text-warning mb-3">
                      <span style={{fontSize: '3rem'}}>📝</span>
                    </div>
                    <h5 className="fw-bold text-dark">Blog Platform</h5>
                    <p className="text-muted">
                      Share your sustainability journey, tips, and experiences with our growing community
                    </p>
                    <div className="mt-3">
                      <span className="badge bg-warning text-dark">Coming Soon</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100 bg-info bg-opacity-10">
                  <div className="card-body text-center p-4">
                    <div className="text-info mb-3">
                      <span style={{fontSize: '3rem'}}>👥</span>
                    </div>
                    <h5 className="fw-bold text-dark">Community Forums</h5>
                    <p className="text-muted">
                      Discuss sustainability topics, ask questions, and connect with like-minded individuals
                    </p>
                    <div className="mt-3">
                      <span className="badge bg-info">Phase 2</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100 bg-success bg-opacity-10">
                  <div className="card-body text-center p-4">
                    <div className="text-success mb-3">
                      <span style={{fontSize: '3rem'}}>🏆</span>
                    </div>
                    <h5 className="fw-bold text-dark">Challenges & Rewards</h5>
                    <p className="text-muted">
                      Participate in sustainability challenges and earn recognition for your eco-friendly efforts
                    </p>
                    <div className="mt-3">
                      <span className="badge bg-success">Phase 3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Current Blog Posts Placeholder */}
        <section className="bg-white py-5">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold text-success mb-3">Featured Sustainability Stories</h2>
              <p className="text-muted">Get inspired while we build the community features</p>
            </div>

            <div className="row g-4">
              {/* Placeholder Blog Post 1 */}
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <span className="badge bg-success">Sustainability</span>
                      <small className="text-muted">5 min read</small>
                    </div>
                    <h5 className="card-title fw-bold text-dark">How I Reduced My Carbon Footprint by 40%</h5>
                    <p className="card-text text-muted">
                      Discover simple lifestyle changes that made a significant impact on my environmental footprint...
                    </p>
                    <div className="mt-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <small className="fw-semibold text-dark">Community Member</small>
                          <br />
                          <small className="text-muted">Coming Soon</small>
                        </div>
                        <button className="btn btn-outline-success btn-sm" disabled>
                          Read More (Soon)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Placeholder Blog Post 2 */}
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <span className="badge bg-info">Energy</span>
                      <small className="text-muted">7 min read</small>
                    </div>
                    <h5 className="card-title fw-bold text-dark">Solar Power: My First Year Experience</h5>
                    <p className="card-text text-muted">
                      A comprehensive look at the costs, benefits, and surprises of switching to solar energy at home...
                    </p>
                    <div className="mt-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <small className="fw-semibold text-dark">Community Member</small>
                          <br />
                          <small className="text-muted">Coming Soon</small>
                        </div>
                        <button className="btn btn-outline-success btn-sm" disabled>
                          Read More (Soon)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-light py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <div className="bg-white rounded-3 p-5 shadow-sm">
                  <h3 className="fw-bold text-success mb-3">Be the First to Know!</h3>
                  <p className="text-muted mb-4">
                    Get notified when our community features launch and be among the first to join the conversation.
                  </p>
                  <div className="row g-3 justify-content-center">
                    <div className="col-md-8">
                      <input 
                        type="email" 
                        className="form-control form-control-lg" 
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div className="col-md-4">
                      <button className="btn btn-success btn-lg w-100">
                        Notify Me
                      </button>
                    </div>
                  </div>
                  <small className="text-muted mt-3 d-block">
                    We'll only email you about major updates. No spam, ever.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Form Modal - Updated with Coming Soon */}
                <div className="modal-body text-center py-5">
                  <div className="display-1 text-warning mb-3">🚧</div>
                  <h4 className="text-dark mb-3">Blog Feature Under Construction</h4>
                  <p className="text-muted mb-4">
                    We're excited to launch our community blogging platform soon! 
                    You'll be able to share your sustainability stories and connect with others.
                  </p>
                  <button 
                    className="btn btn-warning btn-lg"
                    onClick={() => setShowForm(false)}
                  >
                    Got it!
                  </button>
                </div>
              </div>
    </Base>
  );
};

export default BlogPage;