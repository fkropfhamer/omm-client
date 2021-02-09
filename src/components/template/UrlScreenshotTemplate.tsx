import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { apiEndpointUrl } from "../../constants";
import '../../css/Display.css'

interface State {
    urlInput: string;
}

export default class UrlScreenshotTemplate extends React.Component<RouteComponentProps, State> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            urlInput: ""
        }
    }

    private handleUrlSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData();
        data.append("url", this.state.urlInput)

        fetch(apiEndpointUrl + 'template', {
            method: "POST",
            body: data
        })
        .then(res => res.json()) 
        .then(json => {
            console.log(json);
            this.props.history.push('/meme/edit/' + json.data.id)
        })
        .catch(err => console.log(err));
    }

    changeInputUrl = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({urlInput: event.currentTarget.value});
    }

    render() {
        return (
            <div>
                <h2>Screenshot from Url</h2>
                <form onSubmit={this.handleUrlSubmit}>
                    <input type="url" value={this.state.urlInput} onChange={this.changeInputUrl}></input>
                    <button type="submit">Screenshot</button>
                </form>
            </div>
        );
    }
}