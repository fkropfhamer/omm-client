import { useState } from "react";
import { MdKeyboardVoice } from "react-icons/md";

interface Props {
    onSpeech: (result: string) => void
}

export default function DictateButton(props: Props) {
    const [isRecording, setIsRecording] = useState(false);

    const SomeSpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SomeSpeechRecognition) {
        return <div></div>
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
              
              // check if the input starts with 'hello'
                if(transcript.indexOf('hello') === 0) {
                    console.log('You said hello to somebody.');
                }
            }
        });

        recognition.addEventListener('end', event => {
            setIsRecording(false);
        });

        recognition.start();
    }

    return <button disabled={isRecording} onClick={onClick}><MdKeyboardVoice /></button>
}