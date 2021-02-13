export default function textToSpeech(text: string) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = 'en-US';
    speechSynthesis.speak(msg);
}
