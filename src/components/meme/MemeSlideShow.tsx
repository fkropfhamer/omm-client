import {useEffect, useState} from "react";
import {apiEndpointUrl} from "../../constants";
import Meme from "./Meme";
import {Button, Col, Dropdown, Row} from "react-bootstrap";


export default function MemeSlideShow() {
    const [memes, setMemes] = useState([] as any[]);
    const [currentMemeIndex, setCurrentMemeIndex] = useState(0);

    const currentMeme = memes[currentMemeIndex];

    const [randActive, setRandActive] = useState(false);
    const [orderActive, setOrderActive] = useState(false);

    function onPrev() {
        const index = currentMemeIndex - 1;

        if (index < 0) {
            setCurrentMemeIndex(memes.length - 1);
            return
        }

        setCurrentMemeIndex(index);

    }

    function onNext() {
        setCurrentMemeIndex((currentMemeIndex + 1) % memes.length);
    }


     function onRandom() {

        const minIndex = 0;
        const maxIndex = memes.length - 1;
        const randomIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex
         setCurrentMemeIndex(randomIndex);
    }

    useEffect(() => {
        const fetchMemes = async () => {
            const res = await fetch(apiEndpointUrl + 'meme');
            const json = await res.json();

            console.log(json)

            setMemes(json.data.memes)
        }

        fetchMemes();
    }, [randActive, orderActive])

    useEffect(() => {
        if (orderActive) {
            const next = (currentMemeIndex + 1) % memes.length;
            const orderInterval = setInterval(() => setCurrentMemeIndex(next), 1000);
            return () => clearInterval(orderInterval);
        }
    }, [currentMemeIndex, memes.length, orderActive]);

    useEffect(() => {
        if (randActive) {
             const randInterval = setInterval(() =>
                 setCurrentMemeIndex( Math.floor(Math.random() * ((memes.length - 1) + 1))
        )
             , 1000);

                return () => clearInterval(randInterval);
        }
    }, [memes.length, randActive]);


    return <div>
        {currentMeme ?
            <div>
                <div>
                    <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col>
                            {" "}
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Play
                                </Dropdown.Toggle>
                                <Button variant="danger" onClick={() => {
                                    setRandActive(false);
                                    setOrderActive(false);
                                }}>Stop</Button>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => {
                                        if (!orderActive) {
                                            setRandActive(false);
                                            setOrderActive(true);
                                        }
                                    }}>ordered</Dropdown.Item>
                                    <Dropdown.Item onClick=
                                                       {() => {
                                                           if (!randActive) {
                                                               setOrderActive(false);
                                                               setRandActive(true);
                                                           }
                                                       }}
                                    >random</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </div>
                <Meme meme={currentMeme}/>
                <button onClick={onPrev}>pref</button>
                <button onClick={onNext}>next</button>
                <button onClick={onRandom}>random</button>

            </div> : 'loading'}
    </div>
}
