import {RouteComponentProps} from "react-router-dom";
import React, {useState} from "react";

export default function UserUrlTemplate(props: RouteComponentProps) {
    const [url, setUrl] = useState('');

    function submit(event:  React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const encodedUrl =  encodeURIComponent(url);
        props.history.push('/meme/edit/' + encodedUrl);
    }

    return (
        <div>
            <h2>Image from Url</h2>
            <form onSubmit={submit}>
                <input type="url" value={url} onChange={(event) => setUrl(event.target.value)} />
                <button type="submit">submit</button>
            </form>
        </div>
    );
}
