export interface MemeObject {
    url: string,
    name: string,
    views: number,
}

interface Props {
    meme: MemeObject
}

export default function Meme(props: Props) {
    const {name, url, views} = props.meme;

    return <div>
        <h1>{name}</h1>
        <img src={url} alt={'meme with name "'+ name + '".'}></img>
        <h1>Views: {views}</h1>
    </div>
}
