import classify from "../../util/imageClassification";
import textToSpeech from "../../util/textToSpeech";

export interface MemeObject {
    url: string,
    name: string,
    views: number,
}

interface Props {
    meme: MemeObject
}

async function toDataURL(url: string) {
    const response = await fetch(url)
    const blob =  await response.blob();

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
    const {name, url, views} = props.meme;

    function describe() {
        const img = new Image(); 
        img.crossOrigin = "anonymous";
        img.onload = () => {
            console.log(img)
            classify(img).then((p) => {
                console.log(p);
                textToSpeech(`I think this image shows ${p.map(a => a.className).join(" or ")}`);
            });

        }
        img.src = url;
    }

    return <div>
        <h1>{name}</h1>
        <img src={url} alt={'meme with name "'+ name + '".'}></img>
        <h1>Views: {views}</h1>
        <button onClick={()=> {
            download(url, name);
        }}>download</button>
        <button onClick={describe}>describe</button>
    </div>
}
