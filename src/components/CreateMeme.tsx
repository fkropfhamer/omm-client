import React from "react";
import { apiEndpointUrl } from "../constants";

interface Props {

}

export default class CreateMeme extends React.Component {
    private fileInput: React.RefObject<any>;

    constructor(props: Props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData();
        data.append("template", this.fileInput.current.files[0])
        
        fetch(apiEndpointUrl + 'template', {
            method: "POST",
            body: data
        }).then(res => res.json()).then(json => console.log(json)).catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h1>Create meme</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="file" ref={this.fileInput}></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}