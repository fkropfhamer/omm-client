import React from "react"
import { RouteComponentProps } from "react-router-dom";
import { apiEndpointUrl } from "../../constants";
import '../../css/EditMeme.css'
import AddImageModal from "./AddImageModal";
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
    img: HTMLElement | null,
    imgUrl: string,
    imgWidth: number,
    imgHeight: number,
    canvasWidth: number,
    canvasHeight: number,
    texts: Text[]
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
            imgUrl: '',
            canvasWidth: 500,
            canvasHeight: 500,
            imgWidth: 0,
            imgHeight: 0
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
    }

    async componentDidMount() {
        const canvas = this.canvas.current;
        const ctx = this.canvas.current.getContext('2d');

        const id = this.props.match.params.id;

        const res = await fetch(apiEndpointUrl + 'template/?id=' + id);
        const json = await res.json();

        this.setState({imgUrl: json.data.template.url})
        
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = this.state.imgUrl;
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

    private async onCreateOnServer(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

        const res = await fetch(apiEndpointUrl + 'meme', {
            method: 'POST',
            body: JSON.stringify({
                url: this.state.imgUrl,
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

    private removeText(index: number) {
        const newTexts = this.state.texts.filter((_, idx) => index !== idx);
        this.setState({ texts: newTexts}, () => this.drawMeme());
    }

    private showAddImageModal() {
        this.addImageModal.current.setState({visible: true});
    }

    private confirm() {
        console.log("woshi confirm hui diao")
    }

    private addImageToMeme(position: string, file: File ) {        
        let reader = new FileReader();
        let newImgHeight: number;
        let newImgWidth: number;

        try {
            reader.readAsDataURL(file);
            reader.onload = (event: Event) => {
                let newImg = new Image();
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
            console.log("No File Uplode");
        }

    }

    render() {
        return (
            <div>
                <div id="container"> 
                    <canvas width={this.state.canvasWidth} height={this.state.canvasHeight} ref={this.canvas}></canvas>

                    <div id="editArea">
                        <label htmlFor="name">Name</label>
                        <span><input id="name" type="text" onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({name: event.target.value})}></input></span>
                        <br/>

                        {this.state.texts.map((text, idx) =>
                            (<TextEditor key={idx} text={text} onChange={(text) => {this.onTextChange(idx, text)}} onRemove={() => this.removeText(idx) }/>)
                        )}
                        
                        <br />
                        <button onClick={this.addText}>Add Text</button>
                        <br />
                        <button onClick={this.showAddImageModal}>Add Image</button>
                        <br />
                        <button onClick={this.onCreateOnServer}>Create on Server</button>
                        <button onClick={this.onCreateLocally}>Create locally and download</button>
                    </div>
                </div>
                <AddImageModal title={"Choose the positon of new Image relative to current Image"} 
                        ref={this.addImageModal} addImageToMeme={(position,file) => this.addImageToMeme(position ,file)}></AddImageModal>
            </div>
        )
    }
}