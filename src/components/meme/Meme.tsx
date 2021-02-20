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

export interface MemeObject {
  url: string;
  name: string;
  views: number;
  fileformat: string;
  votes: string[];
  comments: string[];
  tags: string[];
  createdAt: Date;
}

interface Props {
  meme: MemeObject;
}

async function toDataURL(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();

  return URL.createObjectURL(blob);
}

async function download(url: string, name: string) {
  const a = document.createElement("a");
  a.href = await toDataURL(url);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export default function Meme(props: Props) {
  const {
    name,
    url,
    views,
    fileformat,
    votes,
    comments,
    //tags,
    createdAt,
  } = props.meme;

  console.log(createdAt);
  console.log("lalal");

  return (
    <div>
      <div>
        <Container fluid="md">
          <Row md={8}>
            <Col></Col>
            <Col xs={7}>
              <Card>
                <Card.Body>
                  <Col>
                    <Row>
                      {" "}
                      <Card.Title>{name}</Card.Title>
                      <Card.Img
                        variant="top"
                        src={url}
                        alt={'meme with name "' + name + '".'}
                      />
                    </Row>
                    <Row>
                      <ButtonGroup className="mr-2" size="sm">
                        <Button variant="success">Views:{views}</Button>{" "}
                        <Button variant="success">
                          fileformat:{fileformat}
                        </Button>{" "}
                      </ButtonGroup>
                      <Button
                        variant="info"
                        onClick={() => {
                          download(url, name);
                        }}
                      >
                        download
                      </Button>{" "}
                      <Col>
                        <ButtonGroup className="mr-2" size="sm">
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
                      </Col>
                    </Row>
                  </Col>
                </Card.Body>
              </Card>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
