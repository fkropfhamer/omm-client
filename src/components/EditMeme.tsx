import React from "react"
import { RouteComponentProps } from "react-router-dom";
import { apiEndpointUrl } from "../constants";

interface RouteParams {id: string}

interface State {
    name: string,
    bottomText: string,
    topText: string,
}

export default class EditMeme extends React.Component<RouteComponentProps<RouteParams>, State> {
    private canvas: React.RefObject<any>;
    private img?: HTMLImageElement;

    constructor(props: RouteComponentProps<RouteParams>) {
        super(props);

        this.canvas = React.createRef();

        this.state = {
            name: "",
            bottomText: "",
            topText:"",
        }

        this.drawMeme = this.drawMeme.bind(this);
        this.onBottomTextChange = this.onBottomTextChange.bind(this);
        this.onTopTextChange = this.onTopTextChange.bind(this);
    }

    async componentDidMount() {
        const canvas = this.canvas.current;
        const ctx = this.canvas.current.getContext('2d');

        const id = this.props.match.params.id;

        const res = await fetch(apiEndpointUrl + 'template/?id=' + id);
        const json = await res.json();
        
        const img = new Image();
        img.src = json.data.template.url;

        console.log(json.data.template.url)

        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        }

        this.img = img;
    }

    private drawMeme() {
        const canvas = this.canvas.current;
        const ctx = this.canvas.current.getContext('2d');

        ctx.font = "30px Comic Sans MS";
        ctx.textAlign = "center";

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height)
        ctx.fillText(this.state.bottomText, 150, 50);
        ctx.fillText(this.state.topText, 150, 450);
    }

    private onBottomTextChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        this.setState({bottomText: event.target.value}, () => this.drawMeme());
    }

    private onTopTextChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        this.setState({topText: event.target.value}, () => this.drawMeme())
    }

    render() {
        return (
            <div> 
                <canvas width={500} height={500} ref={this.canvas}></canvas>
                top
                <input type="text" onChange={this.onBottomTextChange}></input>
                bottom
                <input type="text" onChange={this.onTopTextChange}></input>
                name
                <input type="text" onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({name: event.target.value})}></input>
            </div>
        )
    }
}