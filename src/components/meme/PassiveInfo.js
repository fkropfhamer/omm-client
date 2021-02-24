import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Row,
  Col,
  Accordion,
  ListGroup,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FcLike } from "react-icons/fc";
import Barchart from "./Barchart.js";

const PassiveInfo = (props) => {
  const { views, votes, comments, fileformat } = props;
  console.log(props);

  return (
    <div>
      <Container fluid="md">
        <Row md={8}>
          <Col></Col>
          <Col xs={7}>
            <div>
              <Row>
                <ButtonGroup className="mr-2">
                  <Accordion>
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="0"
                        >
                          comments
                        </Accordion.Toggle>

                        <div>
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text>your comment</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                              as="textarea"
                              aria-label="With textarea"
                            />
                          </InputGroup>
                        </div>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <ListGroup>
                            {comments.map((comment, i) => {
                              return (
                                <ListGroup.Item key={i}>
                                  {comment}
                                </ListGroup.Item>
                              );
                            })}
                          </ListGroup>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="1"
                        >
                          <FcLike />
                          liked by
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>{votes}</Card.Body>
                      </Accordion.Collapse>
                      <Button variant="danger">LOVE IT too!</Button>{" "}
                    </Card>
                  </Accordion>
                </ButtonGroup>

                <Col>
                  <Barchart
                    views={views}
                    comments={comments.length}
                    votes={votes.length}
                  />
                </Col>
              </Row>
              <Row>
                {" "}
                <Button variant="success">fileformat:{fileformat}</Button>{" "}
              </Row>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};
export default PassiveInfo;
