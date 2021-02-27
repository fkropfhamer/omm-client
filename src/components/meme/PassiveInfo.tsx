import {
  Button,
  ButtonGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Barchart from "./Barchart";

const PassiveInfo = (props: any) => {
  const { views, votes, comments, fileformat } = props;
  console.log(props);

  return (
    <div>
      <Container fluid="md">
        <Row md={8}>
          <Col xs={7}>
            <div>
              <Row>
                <ButtonGroup className="mr-2">
                <Col>
                  <Barchart
                    views={views}
                    comments={comments.length}
                    votes={votes.length}
                  />
                </Col>
                </ButtonGroup>
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
