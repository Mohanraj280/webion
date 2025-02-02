import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import './learningHub.css';

import { Col, Container, Row } from 'react-bootstrap';

const LearnHubLanding = () => {
  const [counts, setCounts] = useState({
    total: 0,
    placed: 0,
    unplaced: 0,
  });
  useEffect(() => {
    fetchCounts();
    document.title = "HOME";
  }, []);

  const fetchCounts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/count');
      setCounts(res.data);
    } catch (err) {
      console.error("Error fetching counts", err);
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <h1 className="logo">LearnHub</h1>
        
        <a className="admin-btn" href="/admin">Admin</a>
      </nav>
        
      <div className="content">
        <h2 className="title">Learn from the best, be<br></br> your best..</h2>
        <p className="description">
          Give yourself an upgrade with our inspiring online courses and join a global community of learners.
        </p>
        <button className="cta-btn">Get Started</button>
      </div>


      <div className="text-center py-5" style={{ background: 'linear-gradient(to bottom, #111, #000)', color: 'white' }}>
      <h2 className="fw-bold mb-4">Our Placement Partners</h2>

      <div className="container">
        <div className="row justify-content-center">
          {['airbnb.png', 'client-8.png', 'Lifegroups.png', 'myob.png', 'tailus.png', 'microsoft.png', 'coty.png', 'lilly.png'].map((logo, index) => (
            <div key={index} className="col-6 col-md-3 d-flex justify-content-center align-items-center mb-4">
              <img src={`src/assets/${logo}`} alt={logo.split('.')[0]} style={{ maxWidth: '100px', maxHeight: '50px' }} />
            </div>
          ))}
        </div>
      </div>

      <button className="btn btn-warning text-dark fw-bold px-4 py-2 mt-3 rounded-pill">
        and,<br /> more companies
      </button>
    </div>

    <div className="text-white py-5" style={{ backgroundColor: '#000' }}>
     
    <Container>
        <p className="text-primary fw-bold text-center">OPEN SOURCE THEME AND UI COMPONENTS</p>
        <h1 className="fw-bold display-5 mb-4 text-center">
          Geaux Astro helps you <br /> craft beautiful websites <br /> efficiently
        </h1>
<br /><br />
        <Row className="align-items-center">
          <Col md={6}>
            <div className="mb-3 d-flex">
              <img src="src/assets/medal.svg" alt="Certificate Icon" className="me-3" style={{ width: '30px', height: '30px' }} />
              <div>
                <h5 className="fw-bold me-3">Certificate Distribution</h5>
                <p>We offer certificates to validate and recognize <br />your achievement.</p>
              </div>
            </div>

            <div className="mb-3 d-flex">
              <img src="src/assets/thought.png" alt="Knowledge Icon" className="me-3" style={{ width: '30px', height: '30px' }} />
              <div>
                <h5 className="fw-bold">Knowledge</h5>
                <p>We deliver transformative knowledge that <br />empowers and inspires.</p>
              </div>
            </div>

            <div className="mb-3 d-flex">
              <img src="src/assets/training.png" alt="Hands-on Icon" className="me-3" style={{ width: '30px', height: '30px' }} />
              <div>
                <h5 className="fw-bold">Hands-on Experience</h5>
                <p>We provide hands-on experience for real <br />-world learning. You learn best by doing.</p>
              </div>
            </div>
          </Col>

          <Col md={6} className="text-center">
            <img 
              src="src/assets/AboutDashboard.png" 
              alt="Dashboard Mockup" 
              className="img-fluid rounded shadow-lg" 
              style={{ maxWidth: '90%' }} 
            />
          </Col>
        </Row>
      </Container>
    </div>
    <div className="text-white py-5" style={{ backgroundColor: '#000' }}>
      <Container><br />
        <Row className="align-items-center mb-5">
          <Col md={6} className="pe-5">
            <h1 className="fw-bold lh-sm">
            Empower your future 
              with cutting-edge skills 
              New, Embrace innovation, 
              master technology, & 
              shape the digital world 
              Your journey to success starts here.
            </h1>
          </Col>
          <Col md={6} className="ps-5">
          <p>
              Join our course with a proven track record of success, where learning isn't just about gaining skills; it's about growing them. Join us, learn with confidence, and watch your skills soar.
            </p>
                  <Row className="text-center">
                  <Col>
                    <div className="logo">Total Students</div>
                    <h2 className="display-4">{counts.total}</h2>
                  </Col>
                  <Col>
                    <div className="logo">Placed Students</div>
                    <h2 className="display-4">{counts.placed}</h2>
                  </Col>
                  <Col>
                    <div className="logo">Unplaced Students</div>
                    <h2 className="display-4">{counts.unplaced}</h2>
                  </Col>
                </Row>
          </Col>
        </Row><br /><br /><br />
        <footer className="text-center mt-5">
          <h4 className="fw-bold text-lime display-4 logo">LearnHub</h4>
          <p>&copy; 2025 LearnHub Inc. All rights reserved.</p>
          <div>
            <a href="#" className="text-white mx-3 fw-bold text-decoration-none">Form</a> |
            <a href="#" className="text-white mx-3 fw-bold text-decoration-none">Notes</a>
          </div>
        </footer>
      </Container>
    </div>
    </div>
  );
};

export default LearnHubLanding;
