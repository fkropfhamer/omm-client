import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { apiEndpointUrl } from "../constants";
import '../css/Display.css'

interface State {
    urlInput: string;
}

export default class CreateMeme extends React.Component<RouteComponentProps, State> {
    private fileInput: React.RefObject<any>;

    constructor(props: RouteComponentProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
        this.state = {
            urlInput: ""
        }
    }

    private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData();
        data.append("template", this.fileInput.current.files[0])
        
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

    private handleUrlSubmit= (event: React.FormEvent<HTMLFormElement>) => {
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
            <div className='displayWindow'>
                <h1>Create meme</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="file" ref={this.fileInput}></input>
                    <button type="submit">Submit</button>
                </form>
                <form onSubmit={this.handleUrlSubmit}>
                    <input type="url" value={this.state.urlInput} onChange={this.changeInputUrl}></input>
                    <button type="submit">Screenshot</button>
                </form>
            </div>
        );
    }
}