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
import PassiveInfo from "./PassiveInfo.js";

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

  console.log(votes.length, views, comments.length);

  return (
    <div>
      <Container fluid="md">
        <Row md={8}>
          <Col></Col>
          <Col xs={7}>
            <Card>
              <Card.Body>
                <Row>
                  {" "}
                  <Card.Title>{name}</Card.Title>
                  <Card.Img
                    variant="top"
                    src={url}
                    alt={'meme with name "' + name + '".'}
                  />
                </Row>
                <PassiveInfo
                  views={views}
                  comments={comments}
                  votes={votes}
                  fileformat={fileformat}
                />
                <Button
                  variant="info"
                  onClick={() => {
                    download(url, name);
                  }}
                >
                  download
                </Button>{" "}
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}
