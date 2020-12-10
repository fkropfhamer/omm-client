import React from "react";
import { Link } from "react-router-dom";

export interface TemplateObject {
    url: string,
    id: string,
    views: number,
}

interface Props {
    template: TemplateObject
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

export default function Template(props: Props) {
    const {id, url, views} = props.template;

    return <div>
        <img src={url} alt={'meme with id "'+ id + '".'}></img>
        <h1>Views: {views}</h1>
        <button onClick={()=> {
            download(url, 'template-' + id + '.png');
        }}>download</button>
        <Link to={'/edit-meme/' + id}>create Meme from this template.</Link>
    </div>
}
