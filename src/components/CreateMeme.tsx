import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { apiEndpointUrl } from "../constants";

interface State {

}



export default class CreateMeme extends React.Component<RouteComponentProps, State> {
    private fileInput: React.RefObject<any>;

    constructor(props: RouteComponentProps) {
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
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            this.props.history.push('/edit-meme/' + json.data.id)
        })
        .catch(err => console.log(err));
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