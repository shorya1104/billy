import React from 'react';
import { Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const title = 'Dashboard';
    const description = 'Elearning Portal Course Detail Page';

    const breadcrumbs = [
        { to: '', text: 'Dashboard' },
    ];

    return (
        <>
            <HtmlHead title={title} description={description} />
            {/* Title and Top Buttons Start */}
            <div className="page-title-container">
                <Row className="g-0">
                    {/* Title Start */}
                    <Col className="col-auto mb-sm-0 me-auto">
                        <h1 className="mb-0 pb-0 display-4">{title}</h1>
                        <BreadcrumbList items={breadcrumbs} />
                    </Col>
                    {/* Title End */}


                </Row>
            </div>
            {/* Title and Top Buttons End */}


            <Row className="mb-5 g-2">

                {/* Card One */}
                <Col xs="6" md="4" lg="4">
                    <Link to="#">
                        <Card className="h-100 hover-scale-up cursor-pointer">
                            <Card.Body className="d-flex flex-column align-items-center">
                                <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                                    {/* <img src={total} className="text-primary" /> */}
                                </div>
                                <div
                                    className="mb-1 d-flex align-items-center text-alternate lh-1-25"
                                    style={{ fontSize: "0.8rem" }}
                                >
                                    TOTAL BLOGS
                                </div>
                                <div
                                    className="text-primary cta-4"
                                    style={{ fontSize: "1.3rem" }}
                                >
                                    0
                                </div>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>

                {/* Card Two */}
                <Col xs="6" md="4" lg="4">
                    <Card className="h-100 hover-scale-up cursor-pointer">
                        <Card.Body className="d-flex flex-column align-items-center">
                            <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                                {/* <img src={activeDevice} className="text-primary" /> */}
                            </div>
                            <div
                                className="mb-1 d-flex align-items-center text-alternate lh-1-25"
                                style={{ fontSize: "0.8rem" }}
                            >
                                TOTAL OFFER
                            </div>
                            <div
                                className="text-primary cta-4"
                                style={{ fontSize: "1.3rem" }}
                            >
                                5
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Card Three */}
                <Col xs="6" md="4" lg="4">
                    <Card className="h-100 hover-scale-up cursor-pointer">
                        <Card.Body className="d-flex flex-column align-items-center">
                            <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                                {/* <img src={inactiveDevice} className="text-primary" /> */}
                            </div>
                            <div
                                className="mb-1 d-flex align-items-center text-alternate lh-1-25"
                                style={{ fontSize: "0.8rem" }}
                            >TOTAL TICKET
                                
                            </div>
                            <div
                                className="text-primary cta-4"
                                style={{ fontSize: "1.3rem" }}
                            >
                                20
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Card Four */}
                <Col xs="6" md="4" lg="4">
                    <Link to="#">
                        <Card className="h-100 hover-scale-up cursor-pointer">
                            <Card.Body className="d-flex flex-column align-items-center">
                                <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                                    {/* <img src={todayAlert} className="text-primary" /> */}
                                </div>
                                <div
                                    className="mb-1 d-flex align-items-center text-alternate lh-1-25"
                                    style={{ fontSize: "0.8rem" }}
                                >
                                    TOTAL TICKET
                                </div>
                                <div
                                    className="text-primary cta-4"
                                    style={{ fontSize: "1.3rem" }}
                                >
                                    0
                                </div>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>

            </Row>

        </>
    );
};

export default Dashboard;
