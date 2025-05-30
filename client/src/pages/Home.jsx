import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";

const Home = () => {
  return (
    <Container fluid className="py-5 bg-light">
      <Row className="justify-content-center align-items-center text-center">
        <Col md={8} lg={6}>
          <h1 className="mb-4 fw-bold text-primary"> Welcome to the Onboarding System</h1>
          <p className="mb-5 text-muted fs-5">
            Start your journey with us. Register now or access the admin panel to manage your users.
          </p>

          <div className="d-flex justify-content-center gap-3">
            <Link to="/register">
              <Button variant="danger" size="lg">
                Register New Client
              </Button>
            </Link>

            <Link to="/admin/dashboard">
              <Button variant="dark" size="lg">
                 Admin Panel
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
