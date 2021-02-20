import { useEffect, useState } from "react";
import { apiEndpointUrl } from "../../constants";
import Meme from "./Meme";
import { Dropdown, Row, Col } from "react-bootstrap";

export default function MemeOverview() {
  const [memes, setMemes] = useState([] as any[]);

  useEffect(() => {
    const fetchMemes = async () => {
      const res = await fetch(apiEndpointUrl + "meme");
      const json = await res.json();

      console.log(json);
      console.log(json.data.memes);

      setMemes(json.data.memes);
    };

    fetchMemes();
  }, []);

  return (
    <div>
      <div>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col>
            {" "}
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                sort
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">date</Dropdown.Item>
                <Dropdown.Item href="#/action-2">vote</Dropdown.Item>
                <Dropdown.Item href="#/action-3">view</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>
      {memes.map((meme, i) => {
        return <Meme meme={meme} key={i} />;
      })}
    </div>
  );
}
