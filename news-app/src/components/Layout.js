import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form, FormControl, Card, Navbar } from 'react-bootstrap';
import axios from "axios";

const Layout = () => {

    const [articles, setArticles] = useState({})
    const [searchRequest, setSearchRequest] = useState('');
    const [validatedSearchRequest, setValidatedSearchRequest] = useState('');
    const [validated, setValidated] = useState(true);

    // Getting articles

    useEffect(() => {
       getArticles(validatedSearchRequest);
    }, [validatedSearchRequest])

    const getArticles = (keyword) => {
        if (keyword.trim() === '') {
            axios({
                method: 'GET',
                url: `https://gnews.io/api/v4/top-headlines?token=321207f41e5d8d1227d8603bee46bfb3&max=9&lang=en`,
            }).then((response) => {
                setArticles(response.data)
            }, (error) => {
            })
        }
        else {
            axios({
                method: 'GET',
                url: `https://gnews.io/api/v4/search?q=${keyword.trim()}&token=321207f41e5d8d1227d8603bee46bfb3&max=9&lang=en`,
            }).then((response) => {
                setArticles(response.data)
            }, (error) => {
            })
        }
    }

     // Search log
    const searchLog = (keyword) => {
        if (keyword.trim() !== '') {
            axios({
                method: 'POST',
                url: 'http://localhost:8080/api/logSearch',
                data: keyword,
            }).then((response) => {
            }, (error) => {
            })
        }
    }

    // Articles log
    const articleLog = (item) => {
        let article = { title: item.title, description: item.description, url: item.url, image: item.image, publishedAt: item.publishedAt };
        axios({
            method: 'POST',
            url: 'http://localhost:8080/api/logArticle',
            data: article,
        }).then((response) => {
        }, (error) => {
        })
    }

    // Open article on click
    const handleArticleClick = (item) => {
        window.open(item.url, '_blank').focus();
        articleLog(item);
    }

    // Article search implementation
    const handleSearch = (event) => {
        setSearchRequest(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            return false;
        }

        setValidated(true);
        searchLog(searchRequest);
        setValidatedSearchRequest(searchRequest);
        setSearchRequest('');
    };

    return (
        <div>
            <Navbar bg="light" variant="light" className="justify-content-end">
                <Form inline noValidate validated={validated} onSubmit={handleSubmit} className="d-flex flex-row align-items-end">
                    <div className="d-flex flex-column-reverse mr-2">
                        <FormControl type="text" placeholder="Search" onChange={handleSearch} pattern="[a-zA-Z0-9 ]+" maxLength="40" value={searchRequest} />
                        <Form.Control.Feedback type="invalid">
                            Must contain only letters, numbers and spaces.
                        </Form.Control.Feedback>
                    </div>
                    <Button variant="outline-primary" type="submit">Search</Button>
                </Form>
            </Navbar>

            <Container fluid>
                <Row  >
                    {Object.keys(articles).length === 0 ? '' : articles.totalArticles === 0 ? <Col className="text-center mt-5">{`We couldn't find a match for '${validatedSearchRequest}'. Please try another search.`}</Col> :
                        (articles.articles.map((item, key) => (
                            <Col key={key} sm={4} className="pt-3">
                                <Card onClick={() => handleArticleClick(item)} className="card-style">
                                    <Card.Img variant="top" src={`${item.image}`} />
                                    <Card.Body className="truncate">
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Text>
                                            {item.description}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="text-muted border-top-0">{item.publishedAt.replace("T", " ").substr(0, 16)}</Card.Footer>
                                </Card>
                            </Col>
                        ))
                        )
                    }
                </Row>
            </Container>
        </div>
    )
}

export default Layout
