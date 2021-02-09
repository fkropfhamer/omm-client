import React from "react"
import { RouteComponentProps } from "react-router-dom";
import { apiEndpointUrl } from "../../constants";
import '../../css/EditMeme.css'
import TextEditor from "./TextEditor"

interface Text {
    text: string,
    x: number,
    y: number,
    size: string,
    isBold: string
    isItalic: string
    hexColor: string
}

interface RouteParams {id: string}

interface State {
    name: string,
    texts: Text[]
}

export default class EditMeme extends React.Component<RouteComponentProps<RouteParams>, State> {
    private canvas: React.RefObject<any>;
    private img?: HTMLImageElement;
    private imgUrl = "";

    constructor(props: RouteComponentProps<RouteParams>) {
        super(props);

        this.canvas = React.createRef();

        this.state = {
            name: "",
            texts: [
                {
                    text: "",
                    x: 250,
                    y: 50,
                    size: "50",
                    isBold: "",
                    isItalic: "",
                    hexColor: "#F17013"
                },
                {
                    text: "",
                    x: 250,
                    y: 450,
                    size: "50",
                    isBold: "",
                    isItalic: "",
                    hexColor: "#F17013"
                }
            ]
        }

        this.drawMeme = this.drawMeme.bind(this);
        this.addText = this.addText.bind(this);
        this.onCreateOnServer = this.onCreateOnServer.bind(this);
        this.downloadPNG = this.downloadPNG.bind(this);
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
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height)

        this.state.texts.forEach(text => {
            ctx.font = text.size + "px Comic Sans MS" + text.isBold + text.isItalic;
            ctx.fillStyle = text.hexColor;
            ctx.fillText(text.text, text.x, text.y);
        });
    }

    private async onCreateOnServer(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const res = await fetch(apiEndpointUrl + 'meme', {
            method: 'POST',
            body: JSON.stringify({
                url: this.imgUrl,
                bottom: this.state.texts[0].text,
                top: this.state.texts[1].text,
                name: this.state.name,
            }),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        })

        const json = await res.json();

        console.log(json)

        this.props.history.push('/meme/show/' + json.data.id)
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

    private onTextChange(idx: number, text: Text) {
        const newTexts = [...this.state.texts];
        newTexts[idx] = text;
        this.setState({texts: newTexts}, () => this.drawMeme());
    }

    private addText() {
        const newText = {
            text: "",
            x: 250,
            y: 250,
            size: "50",
            isBold: "",
            isItalic: "",
            hexColor: "#F17013"
        };

        this.setState({texts: [...this.state.texts, newText]})
    }

    private RemoveText(index: number) {
        const newTexts = this.state.texts.filter((_, idx) => index !== idx);
        this.setState({ texts: newTexts}, () => this.drawMeme());
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

                        {this.state.texts.map((text, idx) =>
                            (<TextEditor key={idx} text={text} onChange={(text) => {this.onTextChange(idx, text)}} onRemove={() => this.RemoveText(idx) }/>)
                        )}
                        
                        <br />
                        <button onClick={this.addText}>Add Text</button>
                        <br />
                        {<button onClick={this.onCreateOnServer}>Create on Server</button>}
                        <button onClick={this.onCreateLocally}>Create locally and download</button>
                    </div>
                </div>
              
            </div>
        )
    }
}