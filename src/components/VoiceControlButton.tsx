import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { AiFillQuestionCircle } from "react-icons/ai";
import SpeechRecognitionButton from "./SpeechRecognitionButton";

interface Props {
    onSpeech: (result: string) => void
    tooltipText: string
}

export default function VoiceControlButton(props: Props) {
    function renderTooltip(p: any) {
        return <Tooltip id="button-tooltip" {...p}>
            {props.tooltipText}
        </Tooltip>
    }

    return <div>
        <SpeechRecognitionButton onSpeech={props.onSpeech}>Voice Control</SpeechRecognitionButton>
        <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        >
            <AiFillQuestionCircle />
        </OverlayTrigger>
    </div>
}
