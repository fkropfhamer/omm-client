import React from "react"
import { Form } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import { apiEndpointUrl } from "../../constants";
import '../../css/EditMeme.css'
import DictateButton from "../DictateButton";
import AddImageModal from "./AddImageModal";
import PopularTemplateSelector from "./TemplateSelector";
import TextEditor from "./TextEditor"
import DescribeButton from "../../util/DescribeButton";
import VoiceControlButton from "../VoiceControlButton";
import imageCompression from 'browser-image-compression';


interface Text {
    text: string,
    x: number,
    y: number,
    size: string,
    isBold: string
    isItalic: string
    hexColor: string
}

interface RouteParams {url: string}

interface State {
    name: string,
    img: HTMLElement | null,
    imgUrl: string,
    imgWidth: number,
    imgHeight: number,
    canvasWidth: number,
    canvasHeight: number,
    texts: Text[],
    isPrivate: boolean,
    maxSize: number,
}

export default class EditMeme extends React.Component<RouteComponentProps<RouteParams>, State> {
    private canvas: React.RefObject<any>;
    private addImageModal: React.RefObject<any>;

    constructor(props: RouteComponentProps<RouteParams>) {
        super(props);

        this.canvas = React.createRef();
        this.addImageModal = React.createRef();

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
            ],
            img: null,
            imgUrl: decodeURIComponent(this.props.match.params.url),
            canvasWidth: 500,
            canvasHeight: 500,
            imgWidth: 0,
            imgHeight: 0,
            isPrivate: false,
            maxSize: 2,
        }

        this.drawMeme = this.drawMeme.bind(this);
        this.addText = this.addText.bind(this);
        this.onCreateOnServer = this.onCreateOnServer.bind(this);
        this.downloadPNG = this.downloadPNG.bind(this);
        this.onCreateLocally = this.onCreateLocally.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.removeText = this.removeText.bind(this);
        this.showAddImageModal = this.showAddImageModal.bind(this);
        this.addImageToMeme = this.addImageToMeme.bind(this);
        this.setPrivate = this.setPrivate.bind(this);
        this.onSpeech = this.onSpeech.bind(this);
        this.onMaxSizeChange = this.onMaxSizeChange.bind(this);
    }

    async componentDidMount() {
        const canvas = this.canvas.current;
        const ctx = this.canvas.current.getContext('2d');

        const { url } = this.props.match.params;

        console.log(url);

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = decodeURIComponent(url);
        img.onload = () => {
            this.setState({imgWidth: img.width})
            this.setState({imgHeight: img.height})
            this.setState({img: img})
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        }
    }

    private drawMeme() {
        const canvas = this.canvas.current;
        const ctx = this.canvas.current.getContext('2d');

        ctx.textAlign = "center";
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(this.state.img, 0, 0, canvas.width, canvas.height)

        this.drawTexts();
    }

    private drawTexts() {
        const ctx = this.canvas.current.getContext('2d');

        this.state.texts.forEach(text => {
            ctx.font = text.size + "px Comic Sans MS" + text.isBold + text.isItalic;
            ctx.fillStyle = text.hexColor;
            ctx.fillText(text.text, text.x, text.y);
        });
    }

    private async onCreateOnServer(event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

        const res = await fetch(apiEndpointUrl + 'meme', {
            method: 'POST',
            body: JSON.stringify({
                url: this.state.imgUrl,
                texts: this.state.texts,
                name: this.state.name,
                isPrivate: this.state.isPrivate,
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

    private async downloadPNG(filename = 'canvas.png') {
        this.canvas.current.toBlob(async (b: File) => {
            const compressed = await imageCompression(b, {maxSizeMB: this.state.maxSize})

            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    EditMeme.downloadURI(e.target.result as string, filename)
                }
            };
            reader.readAsDataURL(compressed);
        }, 'image/png');
    }

    private static downloadURI(uri: string, name: string) {
        const link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    private onCreateLocally(event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
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

    private removeText(index: number) {
        const newTexts = this.state.texts.filter((_, idx) => index !== idx);
        this.setState({ texts: newTexts}, () => this.drawMeme());
    }

    private showAddImageModal() {
        this.addImageModal.current.setState({visible: true});
    }

    private addImageToMeme(position: string, file: File ) {
        let reader = new FileReader();
        let newImgHeight: number;
        let newImgWidth: number;

        try {
            reader.readAsDataURL(file);
            reader.onload = (event: Event) => {
                let newImg = new Image();
                newImg.crossOrigin = "anonymous";
                newImg.src = reader.result as string;

                newImg.onload = (event: Event) => {
                    newImgHeight = newImg.height;
                    newImgWidth = newImg.width;

                    if(position === "left") {
                        const canvas = this.canvas.current;
                        const ctx = this.canvas.current.getContext('2d');

                        ctx.textAlign = "center";
                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        //TODO: Does the height need to be scaled equally
                        let widthPercent = newImgWidth / (this.state.imgWidth + newImgWidth)

                        console.log(widthPercent)

                        ctx.drawImage(newImg, 0, 0, widthPercent * canvas.width, canvas.height)
                        ctx.drawImage(this.state.img, widthPercent * canvas.width, 0, (1 - widthPercent) * canvas.width, canvas.height)
                    }

                    else if(position === "right") {
                        const canvas = this.canvas.current;
                        const ctx = this.canvas.current.getContext('2d');

                        ctx.textAlign = "center";
                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        //TODO: Does the height need to be scaled equally
                        let widthPercent = this.state.imgWidth / (this.state.imgWidth + newImgWidth)

                        console.log(widthPercent)

                        ctx.drawImage(this.state.img, 0, 0, widthPercent * canvas.width, canvas.height)
                        ctx.drawImage(newImg, widthPercent * canvas.width, 0, (1 - widthPercent) * canvas.width, canvas.height)
                    }
                    else if(position === "above") {
                        this.setState({canvasHeight: this.state.canvasHeight + newImgHeight})

                        const canvas = this.canvas.current;
                        const ctx = this.canvas.current.getContext('2d');

                        ctx.textAlign = "center";
                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        ctx.drawImage(newImg, 0, 0, canvas.width, newImgHeight)
                        ctx.drawImage(this.state.img, 0, newImgHeight, canvas.width, canvas.height-newImgHeight)
                    }
                    else if(position === "below") {
                        let oldCanvasHeight = this.state.canvasHeight;
                        this.setState({canvasHeight: this.state.canvasHeight + newImgHeight})

                        const canvas = this.canvas.current;
                        const ctx = this.canvas.current.getContext('2d');

                        ctx.textAlign = "center";
                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        ctx.drawImage(this.state.img, 0, 0, canvas.width, oldCanvasHeight)
                        ctx.drawImage(newImg, 0, oldCanvasHeight, canvas.width, newImgHeight)
                    }

                    const dataURL = this.canvas.current.toDataURL();
                    const img = new Image();
                    img.crossOrigin = "anonymous";
                    img.src = dataURL;
                    img.onload = () => {
                        this.setState({img: img})
                    }

                    this.drawTexts();
                }
            }
        } catch(err) {
            console.log("No File Uploaded");
        }

    }

    private changeTemplate(imgUrl: string) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imgUrl;
        img.onload = () => {
            this.setState({imgUrl: imgUrl});
            this.setState({imgWidth: img.width})
            this.setState({imgHeight: img.height})
            this.setState({img: img})
            this.drawMeme();
        }
    }

    private setPrivate(event: any) {
        const isPrivate = !this.state.isPrivate;

        this.setState({ isPrivate });
    }

    private onSpeech(result: string) {
        if (result.includes('add') && result.includes('text')) {
            this.addText();
        }

        if (result.includes('add') && result.includes('image')) {
            this.showAddImageModal();
        }

        if (result.includes('remove') && result.includes('text')) {
            this.removeText(this.state.texts.length - 1);
        }

        if (result.includes('create') && result.includes('server')) {
            this.onCreateOnServer();
        }

        if ((result.includes('create') && (result.includes('local') || result.includes('locally'))) || result.includes('download')) {
            this.onCreateLocally();
        }
    }

    private onMaxSizeChange(event:  React.ChangeEvent<HTMLInputElement>) {
        let value = parseInt(event.target.value);
        if (value < 1) {
            value = 1;
        }

        this.setState({maxSize: value});
    }

    render() {
        return (
            <div>
                <div id="container">
                    <canvas width={this.state.canvasWidth} height={this.state.canvasHeight} ref={this.canvas} />

                    <div id="editArea">

                        <PopularTemplateSelector onChangeTemplate={(imgUrl) => this.changeTemplate(imgUrl) } />
                        <br/>

                        <label htmlFor="name">Name</label>
                        <span>
                            <input id="name" value={this.state.name} type="text" onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({name: event.target.value})} />
                            <DictateButton onSpeech={(text) => this.setState({name: text})}/>
                        </span>
                        <br/>

                        {this.state.texts.map((text, idx) =>
                            (<TextEditor key={idx} text={text} onChange={(text) => {this.onTextChange(idx, text)}} onRemove={() => this.removeText(idx) }/>)
                        )}

                        <br />
                        <button onClick={this.addText}>Add Text</button>
                        <br />
                        <button onClick={this.showAddImageModal}>Add Image</button>
                        <br />
                        <Form.Check type="checkbox" checked={this.state.isPrivate} onChange={this.setPrivate} label="private"/>
                        <button onClick={this.onCreateOnServer}>Create on Server</button>
                        <button onClick={this.onCreateLocally}>Create locally and download</button><input type="number" value={this.state.maxSize} onChange={this.onMaxSizeChange}/>max size in MB <br/>
                        <DescribeButton url={decodeURIComponent(this.props.match.params.url)} />
                    </div>
                </div>
                <AddImageModal title={"Choose the positon of new Image relative to current Image"}
                        ref={this.addImageModal} addImageToMeme={(position,file) => this.addImageToMeme(position ,file)} />
                <VoiceControlButton onSpeech={this.onSpeech}  tooltipText={"available commands: add text, add image, remove text, create on server, create locally and download"}/>
            </div>
        )
    }
}
