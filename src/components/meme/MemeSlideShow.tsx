import { useEffect, useState } from "react";
import { apiEndpointUrl } from "../../constants";
import Meme from "./Meme";

export default function MemeSlideShow() {
    const [memes, setMemes] = useState([] as any[]);
    const [currentMemeIndex, setCurrentMemeIndex] = useState(0);

    const currentMeme = memes[currentMemeIndex];

    function onPrev() {
        const index = currentMemeIndex - 1;

        if (index < 0) {
            setCurrentMemeIndex(memes.length - 1);
            return
        }

        setCurrentMemeIndex(index);
    }

    function onNext() {
        setCurrentMemeIndex((currentMemeIndex + 1) %  memes.length);
    }

    useEffect(() => {
        const fetchMemes = async () => {
            const res = await fetch(apiEndpointUrl + 'meme');
            const json = await res.json();

            console.log(json)

            setMemes(json.data.memes)
        }

        fetchMemes();
    }, [])


    return <div>
        {currentMeme ?
        <div> 
            <Meme meme={currentMeme} />
            <button onClick={onPrev}>pref</button>
            <button onClick={onNext}>next</button> 
        </div>: 'loading'}
    </div>
}
