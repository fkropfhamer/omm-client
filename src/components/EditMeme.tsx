import React from "react"
import { RouteComponentProps } from "react-router-dom";
import { apiEndpointUrl } from "../constants";
import '../css/EditMeme.css'
import TextEditor from "./TextEditor"


interface RouteParams {id: string}

interface State {
    name: string,
    bottomText: string,
    topText: string,
    topX: number,
    topY: number,
    bottomX: number,
    bottomY: number,
    topSize: string,
    bottomSize: string
}

export default class EditMeme extends React.Component<RouteComponentProps<RouteParams>, State> {
    private canvas: React.RefObject<any>;
    private topTextEditor!: React.RefObject<TextEditor>;
    private bottomTextEditor!: React.RefObject<TextEditor>;
    private img?: HTMLImageElement;
    private imgUrl = "";

    constructor(props: RouteComponentProps<RouteParams>) {
        super(props);

        this.canvas = React.createRef();
        this.topTextEditor = React.createRef();
        this.bottomTextEditor = React.createRef();

        this.state = {
            name: "",
            bottomText: "",
            topText: "",
            topX: 250,
            topY: 50,
            bottomX: 250,
            bottomY: 450,
            topSize: "50",
            bottomSize: "50"
        }

        this.drawMeme = this.drawMeme.bind(this);
    }

    async componentDidMount() {
        const canvas = this.canvas.current;
        const ctx = this.canvas.current.getContext('2d');

        const id = this.props.match.params.id;

        const res = await fetch(apiEndpointUrl + 'template/?id=' + id);
        const json = await res.json();

        this.imgUrl = json.data.template.url;
        
        const img = new Image();
        img.crossOrigin = "anonymous";
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

        ctx.textAlign = "center";
        console.log(this.state.topSize)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height)

        const topTextEditorState = this.topTextEditor.current?.state;

        ctx.font = topTextEditorState?.size + "px Comic Sans MS" + topTextEditorState?.isBold + topTextEditorState?.isItalic;
        ctx.fillStyle = topTextEditorState?.hexColor;
        ctx.fillText(topTextEditorState?.text, topTextEditorState?.x, topTextEditorState?.y);
        
        
        const bottomTextEditorState = this.bottomTextEditor.current?.state;
        ctx.font = bottomTextEditorState?.size + "px Comic Sans MS" + bottomTextEditorState?.isBold + bottomTextEditorState?.isItalic;
        ctx.fillStyle = bottomTextEditorState?.hexColor;
        ctx.fillText(bottomTextEditorState?.text, bottomTextEditorState?.x, bottomTextEditorState?.y);
    }

    private async onCreateOnServer(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const res = await fetch(apiEndpointUrl + 'meme', {
            method: 'POST',
            body: JSON.stringify({
                url: this.imgUrl,
                bottom: this.state.bottomText,
                top: this.state.topText,
                name: this.state.name,
            }),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        })

        const json = await res.json();

        console.log(json)

        this.props.history.push('/show-meme/' + json.data.id)
    }

    private downloadPNG(filename = 'canvas.png') {
        const dataURL = this.canvas.current.toDataURL('image/png');
        EditMeme.downloadURI(dataURL, filename);
    }

    private static downloadURI(uri: string, name: string) {
        const link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    private onCreateLocally(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (this.state.name !== '') {
            this.downloadPNG(this.state.name + '.png')
        }

        this.downloadPNG();
    }

    render() {
        return (
            <div>
                <div id="container"> 
                    <canvas width={500} height={500} ref={this.canvas}></canvas>

                    <div id="editArea">
                        <label htmlFor="name">Name</label>
                        <span><input id="name" type="text" onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({name: event.target.value})}></input></span>
                        <br/>

                        <TextEditor name="Top" x={250} y={50} ref={this.topTextEditor} drawMeme={this.drawMeme}></TextEditor>
                        <TextEditor name="Bottom" x={250} y={450} ref={this.bottomTextEditor} drawMeme={this.drawMeme}></TextEditor>    
                        

                        <br />
                        <button onClick={this.onCreateOnServer}>Create on Server</button>
                        <button onClick={this.onCreateLocally}>Create locally and download</button>
                    </div>
                </div>
              
            </div>
        )
    }
}