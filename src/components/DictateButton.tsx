import React, { useState } from "react";
import { MdKeyboardVoice } from "react-icons/md";
import SpeechRecognitionButton from "./SpeechRecognitionButton";

interface Props {
    onSpeech: (result: string) => void
}

export default function DictateButton(props: Props) {
    return <SpeechRecognitionButton onSpeech={props.onSpeech}><MdKeyboardVoice /></SpeechRecognitionButton>
}
