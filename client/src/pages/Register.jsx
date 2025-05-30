import { useState } from "react";
import { registerUser } from "../services/api";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; // For Back Button
import "../Register.css";
import logo from "../assets/Dynografx.png"
const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        dob: "",
        businessName: "",
        businessType: "",
        businessCategory: "",
        services: "",
        logo: null,
        establishmentDate: "",
        businessMobile: "",
        businessWhatsapp: "",
        businessAddress: "",
        coordinator: "",
        socialMedia: {
            instagramId: "",
            instagramPassword: "",
            facebookAccess: "",
            youtubeAccess: "",
            gmbAccess: "",
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("socialMedia.")) {
            const field = name.split(".")[1];
            setFormData((prevState) => ({
                ...prevState,
                socialMedia: {
                    ...prevState.socialMedia,
                    [field]: value,
                },
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, logo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => {
                if (key === "socialMedia") {
                    Object.keys(formData.socialMedia).forEach((subKey) => {
                        formDataToSend.append(`socialMedia.${subKey}`, formData.socialMedia[subKey]?.trim() || "");
                    });
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            });

            await registerUser(formDataToSend);
            alert("User registered successfully!");
        } catch {
            alert("Registration failed! Check console for details.");
        }
    };

    return (
        <Container fluid className="register-container">
            <Container className="register-form">
                {/* Flex Row for Back Button and Logo */}
                <Row className="align-items-center mb-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Col xs="auto">
                        <Link to="/" className="back-btn">
                            <Button variant="outline-secondary" className="back-arrow-btn">
                                ← Back
                            </Button>
                        </Link>
                    </Col>
                    <Col xs="auto" className="ml-auto">
                        <img src={logo} alt="Logo" className="logo" style={{ width: '60px', height: '60px' }} />
                    </Col>
                </Row>

                {/* Form */}
                <p>DynoGrafx Solutions Onboarding Form</p>
                <Form onSubmit={handleSubmit}>
                    <Row className="form-group">
                        <Col md={6} className="mb-3"><Form.Control type="text" name="name" placeholder="Full Name" onChange={handleChange} required /></Col>
                        <Col md={6} className="mb-3"><Form.Control type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required /></Col>
                    </Row>

                    <Row className="form-group">
                        <Col md={6} className="mb-3"><Form.Control type="text" name="address" placeholder="Address" onChange={handleChange} required /></Col>
                        <Col md={6} className="mb-3"><Form.Control type="date" name="dob" onChange={handleChange} required /></Col>
                    </Row>

                    <Row className="form-group">
                        <Col md={6} className="mb-3"><Form.Control type="text" name="businessName" placeholder="Business Name" onChange={handleChange} required /></Col>
                        <Col md={6} className="mb-3"><Form.Control type="text" name="businessType" placeholder="Business Type" onChange={handleChange} required /></Col>
                    </Row>

                    <Row className="form-group">
                        <Col md={6} className="mb-3"><Form.Control type="text" name="businessCategory" placeholder="Business Category" onChange={handleChange} required /></Col>
                        <Col md={6} className="mb-3"><Form.Control type="text" name="services" placeholder="Services Offered" onChange={handleChange} required /></Col>
                    </Row>

                    <Row className="form-group">
                        <Col md={6} className="mb-3"><Form.Control type="file" name="logo" onChange={handleFileChange} /></Col>
                        <Col md={6} className="mb-3"><Form.Control type="date" name="establishmentDate" onChange={handleChange} required /></Col>
                    </Row>

                    <Row className="form-group">
                        <Col md={6} className="mb-3"><Form.Control type="text" name="businessMobile" placeholder="Business Mobile" onChange={handleChange} required /></Col>
                        <Col md={6} className="mb-3"><Form.Control type="text" name="businessWhatsapp" placeholder="Business WhatsApp" onChange={handleChange} required /></Col>
                    </Row>

                    <Row className="form-group">
                        <Col md={6} className="mb-3"><Form.Control type="text" name="businessAddress" placeholder="Business Address" onChange={handleChange} required /></Col>
                        <Col md={6} className="mb-3"><Form.Control type="text" name="coordinator" placeholder="Coordinator Name" onChange={handleChange} required /></Col>
                    </Row>

                    <h3>Social Media Access</h3>
                    <Row className="form-group">
                        <Col md={6} className="mb-3"><Form.Control type="text" name="socialMedia.instagramId" placeholder="Instagram ID" onChange={handleChange} /></Col>
                        <Col md={6} className="mb-3"><Form.Control type="password" name="socialMedia.instagramPassword" placeholder="Instagram Password" onChange={handleChange} /></Col>
                    </Row>

                    <Row className="form-group">
                        <Col md={6} className="mb-3"><Form.Control type="text" name="socialMedia.facebookAccess" placeholder="Facebook Access" onChange={handleChange} /></Col>
                        <Col md={6} className="mb-3"><Form.Control type="text" name="socialMedia.youtubeAccess" placeholder="YouTube Access" onChange={handleChange} /></Col>
                    </Row>

                    <Row className="form-group">
                        <Col md={6} className="mb-3"><Form.Control type="text" name="socialMedia.gmbAccess" placeholder="Google My Business Access" onChange={handleChange} /></Col>
                    </Row>

                    <Button variant="danger" type="submit" className="register-btn">Register</Button>
                </Form>
            </Container>
        </Container>
    );
};

export default Register;