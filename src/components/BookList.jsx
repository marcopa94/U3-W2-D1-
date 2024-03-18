import React, { Component } from "react";
import SingleBook from "./SingleBook";
import { Col, Form, Row, ListGroup } from "react-bootstrap";

class BookList extends Component {
  state = {
    searchQuery: "",
    currentBook: null,
    currentComment: [],
    currentasin: null,
  };

  fetchFilm = () => {
    fetch("https://striveschool-api.herokuapp.com/api/comments/" + this.state.currentasin, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWVlMTRjNTllYzAwMTk5MGQ3MDIiLCJpYXQiOjE3MTA3Njk3NjYsImV4cCI6MTcxMTk3OTM2Nn0.diPaJeq_zgAe_lfZXRycDrFcMsk837rracDlVjcbgk4",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Problema con il server");
        }
      })
      .then((data) => {
        this.setState({ currentComment: data });
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.fetchFilm();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentasin !== this.state.currentasin) {
      this.fetchFilm();
    }
  }
  render() {
    const filteredBooks = this.props.books.filter((b) =>
      b.title.toLowerCase().includes(this.state.searchQuery.toLowerCase())
    );

    return (
      <>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={4} className="text-center">
            <Form.Group>
              <Form.Control
                type="search"
                placeholder="Cerca un libro"
                value={this.state.searchQuery}
                onChange={(e) => this.setState({ searchQuery: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="g-2 mt-3">
          <Col xs={6} md={6}>
            {filteredBooks.map((b) => (
              <SingleBook key={b.asin} book={b} updateCurrentBook={this.updateCurrentBook} />
            ))}
          </Col>
          <Col xs={6} md={6}>
            {this.state.currentBook && (
              <div>
                <ListGroup>
                  <ListGroup.Item>
                    <h5>Libro Corrente</h5>
                  </ListGroup.Item>
                  <ListGroup.Item>{this.state.currentBook.title}</ListGroup.Item>
                  <ListGroup.Item>{this.state.currentasin}</ListGroup.Item>
                  <ListGroup.Item>{}</ListGroup.Item>
                </ListGroup>
              </div>
            )}
          </Col>
        </Row>
      </>
    );
  }

  updateCurrentBook = (book) => {
    this.setState({ currentBook: book, currentasin: book.asin });
  };
}

export default BookList;
