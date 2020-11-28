export interface MemeObject {
    url: string,
    name: string,

}

interface Props {
    meme: MemeObject
}

export default function Meme(props: Props) {
    const {name, url} = props.meme;

    return <div>
        <h1>{name}</h1>
        <img src={url} alt={'meme with name "'+ name + '".'}></img>
    </div>
}
