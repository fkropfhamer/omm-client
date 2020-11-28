import { useEffect, useState } from "react"
import { apiEndpointUrl } from "../constants";

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
        {memes.map((meme) => {
            return <div>
                <h1>{meme.name}</h1>
                <img src={meme.url} alt='meme'></img>
            </div>
        })}
    </div>
}
