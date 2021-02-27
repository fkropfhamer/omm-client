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
import {FcLike} from "react-icons/fc";
import {
    FacebookShareButton,
    //LinkedinShareButton,
    TwitterShareButton,
    //TelegramShareButton,
    WhatsappShareButton,
    //PinterestShareButton,
    //VKShareButton,
    //OKShareButton,
    RedditShareButton,
    TumblrShareButton,
    LivejournalShareButton,
    MailruShareButton,
    ViberShareButton,
    WorkplaceShareButton,
    LineShareButton,
    //PocketShareButton,
    //InstapaperShareButton,
    EmailShareButton,
    //FacebookShareCount,
    TwitterIcon,
    FacebookIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    WhatsappIcon,
    RedditIcon,
    //RedditShareCount,
    TumblrIcon,
    //TumblrShareCount,
    LivejournalIcon, MailruIcon, ViberIcon, WorkplaceIcon, LineIcon, EmailIcon,
} from 'react-share';
import {useState} from "react";

import PassiveInfo from "./PassiveInfo";
import DescribeButton from "../../util/DescribeButton";

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

    const [likeActive, makeLikeActive] = useState(false);
    const [dislikeActive, makeDislikeActive] = useState(false);
    const [likes, setLike] = useState(0);
    const [dislikes, setDislike] = useState(0);
    console.log(createdAt);

    const handleLike = () => {

        if (dislikeActive) {
            setDislike(dislikes - 1);
            makeDislikeActive(false);
        } else {
        }
        setLike(likes + 1);
        makeLikeActive(true);
        console.log("LIKE" + likes);
       console.log(name);
    }
    const handleDisike = () => {
        if (likeActive) {
            setLike(likes - 1);
            makeLikeActive(false);
        } else {
        }
        setDislike(dislikes + 1);
        makeDislikeActive(true);
        console.log("DISLIKE" + dislikes);
    }

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
                                                <Button
                                                    variant="success">Views:{views}</Button>{" "}
                                            </ButtonGroup>
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
                                                }
                                                }
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
                                                                                <ListGroup.Item
                                                                                    key={i}>
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
                                                                    <FcLike/>
                                                                    liked by
                                                                </Accordion.Toggle>
                                                            </Card.Header>
                                                            <Accordion.Collapse eventKey="1">
                                                                <Card.Body>{votes}</Card.Body>
                                                            </Accordion.Collapse>
                                                            <Button variant="danger"
                                                                    onClick={() => {
                                                                        if (!likeActive) {
                                                                            handleLike();
                                                                        } else {
                                                                        }
                                                                    }}>LOVE IT
                                                                too!  {likes}</Button>
                                                            <Button onClick={() => {
                                                                if (!dislikeActive) {
                                                                    handleDisike();
                                                                } else {
                                                                }
                                                            }}>DISLIKE it  {dislikes}</Button>
                                                        </Card>
                                                    </Accordion>
                                                </ButtonGroup>
                                                <div>
                                                    <InputGroup>
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text>your
                                                                comment</InputGroup.Text>
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
                                    <br></br>
                                    <FacebookShareButton
                                        url={url}
                                        quote={name}
                                    > <FacebookIcon size={30} round/>
                                    </FacebookShareButton>
                                    <FacebookMessengerShareButton
                                        url={url}
                                        appId="521270401588372"
                                    ><FacebookMessengerIcon size={30} round/>
                                    </FacebookMessengerShareButton>
                                    <TwitterShareButton
                                        url={url}
                                        title={name}
                                    ><TwitterIcon size={30} round/>
                                    </TwitterShareButton>
                                    <WhatsappShareButton
                                        url={url}
                                        title={name}
                                        separator=":: "
                                    >
                                        <WhatsappIcon size={30} round/>
                                    </WhatsappShareButton>
                                    <RedditShareButton
                                        url={url}
                                        title={name}
                                        windowWidth={660}
                                        windowHeight={460}
                                    >
                                        <RedditIcon size={30} round/>
                                    </RedditShareButton>
                                    <TumblrShareButton
                                        url={url}
                                        title={name}
                                    >
                                        <TumblrIcon size={30} round/>
                                    </TumblrShareButton>
                                    <LivejournalShareButton
                                        url={url}
                                        title={name}
                                        description={url}
                                    >
                                        <LivejournalIcon size={30} round/>
                                    </LivejournalShareButton>
                                    <MailruShareButton
                                        url={url}
                                        title={name}
                                    >
                                        <MailruIcon size={30} round/>
                                    </MailruShareButton>
                                    <EmailShareButton
                                        url={url}
                                        subject={name}
                                        body="body"
                                        openShareDialogOnClick={true}
                                    >
                                        <EmailIcon size={30} round/>
                                    </EmailShareButton>
                                    <ViberShareButton
                                        url={url}
                                        title={name}
                                    >
                                        <ViberIcon size={30} round/>
                                    </ViberShareButton>
                                    <WorkplaceShareButton
                                        url={url}
                                        quote={name}
                                    >
                                        <WorkplaceIcon size={30} round/>
                                    </WorkplaceShareButton>

                                    <LineShareButton
                                        url={url}
                                        title={name}
                                    >
                                        <LineIcon size={30} round/>
                                    </LineShareButton>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <DescribeButton name={name} url={url}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}
