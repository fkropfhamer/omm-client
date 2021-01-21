import React from "react"
import { RouteComponentProps } from "react-router-dom";
import { apiEndpointUrl } from "../constants";

interface RouteParams {id: string}

interface State {
    name: string,
    bottomText: string,
    topText: string,
    topX: number,
    topY: number,
    bottomX: number,
    bottomY: number,
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
            bottomText: "",
            topText: "",
            topX: 250,
            topY: 50,
            bottomX: 250,
            bottomY: 450,
        }

        this.drawMeme = this.drawMeme.bind(this);
        this.onBottomTextChange = this.onBottomTextChange.bind(this);
        this.onTopTextChange = this.onTopTextChange.bind(this);
        this.onCreateOnServer = this.onCreateOnServer.bind(this);
        this.onTopXChange = this.onTopXChange.bind(this);
        this.onTopYChange = this.onTopYChange.bind(this);
        this.onBottomYChange = this.onBottomYChange.bind(this);
        this.onBottomXChange = this.onBottomXChange.bind(this);
        this.downloadPNG = this.downloadPNG.bind(this);
        this.onCreateLocally = this.onCreateLocally.bind(this);
        this.dictate = this.dictate.bind(this);
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

        ctx.font = "30px Comic Sans MS";
        ctx.textAlign = "center";

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height)
        ctx.fillText(this.state.bottomText, this.state.bottomX, this.state.bottomY);
        ctx.fillText(this.state.topText, this.state.topX, this.state.topY);
    }

    private onBottomTextChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        this.setState({bottomText: event.target.value}, () => this.drawMeme());
    }

    private onTopTextChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        this.setState({topText: event.target.value}, () => this.drawMeme())
    }

    private onBottomXChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        this.setState({bottomX: parseInt(event.target.value)}, () => this.drawMeme());
    }

    private onBottomYChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        this.setState({bottomY: parseInt(event.target.value)}, () => this.drawMeme());
    }

    private onTopXChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        this.setState({topX: parseInt(event.target.value)}, () => this.drawMeme())
    }

    private onTopYChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        this.setState({topY: parseInt(event.target.value)}, () => this.drawMeme())
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

    private dictate() {
        window.SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.addEventListener('result', event => {
            const transcript = event.results[0][0].transcript;
                
            // check if the voice input has ended
            if(event.results[0].isFinal) {
              console.log(transcript);
              
              // check if the input starts with 'hello'
              if(transcript.indexOf('hello') === 0) {
                console.log('You said hello to somebody.');
              }
            }
          });
        recognition.start();
    }

    render() {
        return (
            <div> 
                <canvas width={500} height={500} ref={this.canvas}></canvas>
                top
                <input type="text" onChange={this.onTopTextChange}></input>
                <button onClick={this.dictate}>dictate top</button>
                bottom
                <input type="text" onChange={this.onBottomTextChange}></input>
                <button>dictate bottom</button>
                name
                <input type="text" onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({name: event.target.value})}></input>
                topX
                <input type="number" value={this.state.topX} onChange={this.onTopXChange}></input>
                topY
                <input type="number" value={this.state.topY} onChange={this.onTopYChange}></input>
                bottomX
                <input type="number" value={this.state.bottomX} onChange={this.onBottomXChange}></input>
                bottomY
                <input type="number" value={this.state.bottomY} onChange={this.onBottomYChange}></input>
                <button onClick={this.onCreateOnServer}>Create on Server</button>
                <button onClick={this.onCreateLocally}>Create locally and download</button>
            </div>
        )
    }
}