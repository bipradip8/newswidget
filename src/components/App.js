import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import classes from './App.module.css';

import {Container, Row, Col } from 'react-bootstrap';

import NewsWidget from '../containers/newswidget/newswidget';

class App extends Component {


  render()
  {
    return (
      <Container className={classes.App}>
        <Row className={classes.title_row}>
          <Col><h1>News Feeds</h1></Col>
        </Row>
        <Row>
          <Col md={{ span: 8, offset: 2 }}><Route path="/" exact component={NewsWidget} /></Col>
        </Row>
      </Container>      
    );

  }
  
}

export default App;
