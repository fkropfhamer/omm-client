import React from "react"
import { RouteComponentProps } from "react-router-dom";
import { apiEndpointUrl } from "../constants";
import Meme from "./Meme";

interface RouteParams {id: string}

interface State {
    imgUrl: string
    imgName: string
    isLoading: boolean
}

export default class ShowMeme extends React.Component<RouteComponentProps<RouteParams>, State> {
    constructor(props: RouteComponentProps<RouteParams>) {
        super(props);
        
        this.state = {
            imgUrl: '',
            imgName: '',
            isLoading: true,
        }
    }


    async componentDidMount() {
        const id = this.props.match.params.id;

        const res = await fetch(apiEndpointUrl + 'meme?id=' + id);
        const json = await res.json();

        this.setState({
            isLoading: false,
            imgUrl: json.data.meme.url,
            imgName: json.data.meme.name,
        })
    }

    render() {
        const meme = {url: this.state.imgUrl, name: this.state.imgName};


        return (
            <div> 
                {!this.state.isLoading ? <Meme meme={meme}/> : 'Loading'}
            </div>
        )
    }
}
