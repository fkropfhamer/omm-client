import React from "react";
import { Button } from 'react-bootstrap';
import { describeImage } from "./textToSpeech";

interface Props {
    name?: string,
    url: string
}

export default function DescribeButton(props: Props) {
    return <Button onClick={() => describeImage(props.url, props.name)}>Describe</Button>
}
