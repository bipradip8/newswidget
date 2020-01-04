import React from 'react';
import classes from './articles.module.css';

import { Container, Row, Col } from 'react-bootstrap';


const articles = (props) => {
    return (

        <Container>
            <Row className={classes.article_row}>
                <Col xl={4} lg={4} md={12} sm={12}>
                    <img src={props.imageUrl} alt="Not Available" className={classes.article_image} />
                </Col>
                <Col xl={6} lg={6} md={12} sm={12}>
                    <p className={classes.title}>{props.title}</p>
                    <p className={classes.desc}>{props.descp}</p>
                </Col>
                <Col xl={2} lg={2} md={12} sm={12}>
                    <a href={props.clickUrl} target="_blank" rel="noopener noreferrer">See Full Story</a>
                </Col>
            </Row>
        </Container>


    )
}

export default articles;