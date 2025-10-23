import React from 'react';
import { Link } from 'react-router-dom';
import Base from "../components/Base";

const HomePage = () => {
  return (
    <Base>
      <div className="min-vh-100 bg-light">
        {/* Hero Section */}
        <section className="bg-success text-white py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1 className="display-5 fw-bold mb-4">
                  Track Your Carbon Footprint in Real-Time
                </h1>
                <p className="lead mb-4">
                  Take control of your environmental impact with our intuitive dashboard and personalized insights.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <Link to="/calculator" className="btn btn-light btn-lg px-4 py-2 fw-semibold">
                    Start Tracking →
                  </Link>
                  <button className="btn btn-outline-light btn-lg px-4 py-2 fw-semibold">
                    View Shop
                  </button>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="bg-white rounded p-4 mx-auto mt-4 mt-lg-0" style={{maxWidth: '400px'}}>
                  <div className="text-success mb-3">
                    <h5 className="fw-bold mb-1">Carbon Dashboard</h5>
                    <small className="text-muted">Today</small>
                  </div>
                  
                  {/* Main Footprint Display */}
                  <div className="text-center mb-4">
                    <div className="fw-bold display-4 text-success mb-1">8.2</div>
                    <small className="text-muted">kg CO₂</small>
                  </div>

                  {/* Breakdown Grid */}
                  <div className="row g-2">
                    <div className="col-6">
                      <div className="p-2">
                        <small className="text-muted d-block">Transport</small>
                        <div className="fw-bold text-success">3.6 kg CO₂</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="p-2">
                        <small className="text-muted d-block">Energy</small>
                        <div className="fw-bold text-success">2.8 kg CO₂</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="p-2">
                        <small className="text-muted d-block">Food</small>
                        <div className="fw-bold text-success">1.5 kg CO₂</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="p-2">
                        <small className="text-muted d-block">Other</small>
                        <div className="fw-bold text-success">0.3 kg CO₂</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-5">
          <div className="container">
            <div className="row g-4 text-center">
              <div className="col-md-6 col-lg-3">
                <div className="p-3">
                  <div className="fw-bold text-success fs-2 mb-1">8.2</div>
                  <div className="text-muted small">Your Footprint</div>
                  <div className="text-success small">kg CO₂ today</div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="p-3">
                  <div className="fw-bold text-info fs-2 mb-1">12.5</div>
                  <div className="text-muted small">Average</div>
                  <div className="text-info small">kg CO₂ daily</div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="p-3">
                  <div className="fw-bold text-warning fs-2 mb-1">-34%</div>
                  <div className="text-muted small">Reduction</div>
                  <div className="text-warning small">vs last month</div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="p-3">
                  <div className="fw-bold text-primary fs-2 mb-1">127</div>
                  <div className="text-muted small">Trees Saved</div>
                  <div className="text-primary small">this year</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-5">
          <div className="container">
            <div className="row g-4">
              <div className="col-md-4">
                <div className="text-center p-4">
                  <div className="text-success mb-3">
                    <i className="bi bi-calculator fs-1"></i>
                  </div>
                  <h5 className="fw-bold">Easy Calculator</h5>
                  <p className="text-muted mb-0">
                    Quickly calculate your carbon footprint across different categories.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center p-4">
                  <div className="text-success mb-3">
                    <i className="bi bi-graph-up fs-1"></i>
                  </div>
                  <h5 className="fw-bold">Track Progress</h5>
                  <p className="text-muted mb-0">
                    Monitor your improvements over time with detailed analytics.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center p-4">
                  <div className="text-success mb-3">
                    <i className="bi bi-lightbulb fs-1"></i>
                  </div>
                  <h5 className="fw-bold">Smart Tips</h5>
                  <p className="text-muted mb-0">
                    Get personalized recommendations to reduce your impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-light py-5">
          <div className="container text-center">
            <h3 className="fw-bold mb-3">Start Your Sustainability Journey</h3>
            <p className="text-muted mb-4">
              Join thousands of users making a positive impact on the environment.
            </p>
            <Link to="/calculator" className="btn btn-success btn-lg px-5">
              Calculate Your Footprint
            </Link>
          </div>
        </section>
      </div>
    </Base>
  );
};

export default HomePage;