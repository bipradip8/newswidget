import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';

import { Container, Row, Col, Button} from 'react-bootstrap';

import classes from './newswidget.module.css';
import Articles from '../../components/articles/articles';

class Newswidget extends Component {


    state = {
        news: [],
        search: '',
        loading: false,
        searchInterval: 30
    }

    componentDidMount() {

        const obj = queryString.parse(this.props.location.search);
        this.searchHandler(obj.query);
        setInterval(
            () => {
                if (this.state.searchInterval <= 0) {
                    this.searchHandler(this.state.search);
                    this.resetCounter();
                } else {
                    this.setState({ searchInterval: this.state.searchInterval - 1 })
                }
            }, 1000);
    }

    resetCounter() {
        this.setState({ searchInterval: 30})
    }

    searchHandler = (search_value) => {
        this.setState({ loading: true });
        this.setState({ search: search_value });
        if (search_value) {
            axios.get('https://newsapi.org/v2/everything?q=' + search_value + '&apiKey=a9d7609098634c9bb5b21f0b22f51261&pageSize=10&page=1')
                .then(response => {
                    this.setState({ news: response.data.articles });
                    this.resetCounter();
                    this.setState({ loading: false })
                });
        } else {
            axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=363d26dd3d664d199ca63adc371e22aa&pageSize=10&page=1')
                .then(response => {
                    this.setState({ news: response.data.articles });
                    this.resetCounter();
                    this.setState({ loading: false })
                });
        }
    }


    render() {


        const article = this.state.news.map(singlenews => {
            return <Articles key={singlenews.title}
                title={singlenews.title}
                descp={singlenews.description}
                imageUrl={singlenews.urlToImage}
                clickUrl={singlenews.url} />;
        });

        return (

            <Container className={classes.newswidget}>
                    <Row>
                        <Col xl={9} lg={8} md={8} sm={8}>
                            <input className={classes.search_input} 
                                placeholder="Search Here"
                                onChange={(event) => {
                                this.searchHandler(event.target.value);
                                this.setState({ search: event.target.value })
                                }} />
                        </Col>
                        <Col xl={3} lg={4} md={4} sm={4}>
                            <Button className={classes.search_button} 
                            onClick={() => this.searchHandler(this.state.search)}>
                                    Search
                            </Button>
                        </Col>
                    </Row>
                <Row className={classes.news_block}>
                    <Col>
                        {this.state.loading ? <h1>Refreshing...</h1> : article}
                    </Col>
                </Row>
            </Container>
        );

    }
}

export default Newswidget;