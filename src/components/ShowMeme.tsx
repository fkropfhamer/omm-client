import React from "react"
import { RouteComponentProps } from "react-router-dom";
import { apiEndpointUrl } from "../constants";

interface RouteParams {id: string}

interface State {
    imgUrl: string
    imgName: string
}

export default class ShowMeme extends React.Component<RouteComponentProps<RouteParams>, State> {
    constructor(props: RouteComponentProps<RouteParams>) {
        super(props);
        
        this.state = {
            imgUrl: '',
            imgName: '',
        }
    }


    async componentDidMount() {
        const id = this.props.match.params.id;

        const res = await fetch(apiEndpointUrl + 'meme?id=' + id);
        const json = await res.json();

        this.setState({
            imgUrl: json.data.meme.url,
            imgName: json.data.meme.name,
        })
    }

    render() {
        return (
            <div> 
                <h1>{this.state.imgName ? this.state.imgName : 'Loading'}</h1>
                <img src={this.state.imgUrl} alt='meme'></img>
            </div>
        )
    }
}