import React from "react";
import SpeechRecognitionButton from "./SpeechRecognitionButton";

interface Props {
    onSpeech: (result: string) => void
}

export default function VoiceControlButton(props: Props) {
    return <SpeechRecognitionButton onSpeech={props.onSpeech}>Voice Control</SpeechRecognitionButton>
}
