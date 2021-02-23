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
      setMemes(json.data.memes);
    };

    fetchMemes();
  }, []);
  const handleSort = async (sortBy: string) => {
    console.log(sortBy);
    const res = await fetch(`${apiEndpointUrl}meme/sort/${sortBy}`);
    const json = await res.json();
    setMemes(json.data.memes);
  };

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
                <Dropdown.Item
                  onClick={() => {
                    handleSort("createdAt");
                  }}
                >
                  date
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    handleSort("votes");
                  }}
                >
                  vote
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    handleSort("views");
                  }}
                >
                  view
                </Dropdown.Item>
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
