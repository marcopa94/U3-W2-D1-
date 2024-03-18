import { Card, Col, Row } from "react-bootstrap";
import fantasy from "../data/fantasy.json";

const AllTheBooks = () => {
  return (
    <Row className="g-2">
      {fantasy.map((book) => {
        return (
          <>
            <Col xs={6} md={6} key={book.asin}>
              <Card className="book-cover d-flex flex-column" style={{ width: "18rem" }}>
                <Card.Img variant="top" src={book.img} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col col-6></Col>
          </>
        );
      })}
    </Row>
  );
};

export default AllTheBooks;
