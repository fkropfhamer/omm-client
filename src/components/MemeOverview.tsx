import { useEffect, useState } from "react"
import { apiEndpointUrl } from "../constants";
import Meme from "./Meme";

export default function MemeOverview() {
    const [memes, setMemes] = useState([] as any[]);

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
        {memes.map((meme, i) => {
            return <Meme meme={meme} key={i}/>
        })}
    </div>
}
