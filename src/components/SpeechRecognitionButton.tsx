import React, {useState} from "react";

interface Props {
    onSpeech: (recognition: string) => void
    children?: React.ReactNode
}

export default function SpeechRecognitionButton(props: Props) {
    const [isRecording, setIsRecording] = useState(false);

    const SomeSpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SomeSpeechRecognition) {
        return null;
    }

    function onClick() {
        setIsRecording(true);

        const recognition = new SomeSpeechRecognition();
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.addEventListener('result', event => {
            const transcript = event.results[0][0].transcript;

            // check if the voice input has ended
            if(event.results[0].isFinal) {

                console.log(transcript);

                setIsRecording(false);
                props.onSpeech(transcript);
            }
        });

        recognition.addEventListener('end', event => {
            setIsRecording(false);
        });

        recognition.start();
    }


    return <button disabled={isRecording} onClick={onClick}>{props.children}</button>;
}
