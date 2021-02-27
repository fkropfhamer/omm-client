import classify from "./imageClassification";

export default function textToSpeech(text: string) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = 'en-US';
    speechSynthesis.speak(msg);
}

export function describeImage(url: string, name?: string) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
        console.log(img)
        classify(img).then((p) => {
            if (name) {
                textToSpeech('Here you can see an Image with the name ' + name);
            }
            textToSpeech(`I think this image shows ${p.map(a => a.className).join(" or ")}`);
        });

    }
    img.src = url;
}
