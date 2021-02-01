import React, { Component } from "react";
import { SketchPicker } from "react-color";
import SketchColorPicker from '../js/SketchColorPicker';

interface Props {
    name: string
    x: number,
    y: number,
    drawMeme: () => void
}
interface State {
    name: string,
    text: string,
    x: number,
    y: number,
    size: string,
    isBold: string
    isItalic: string
    hexColor: string
}

export default class TextEditor extends Component<Props, State> {
    private colorPicker: React.RefObject<any>;

    constructor(props: Props) {
        super(props);

        this.colorPicker = React.createRef();

        this.state = {
            name: this.props.name,
            text: "",
            x: this.props.x,
            y: this.props.y,
            size: "50",
            isBold: "",
            isItalic: "",
            hexColor: "#F17013"
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onTextSizeChange = this.onTextSizeChange.bind(this);
        this.onXChange = this.onXChange.bind(this);
        this.onYChange = this.onYChange.bind(this);
        this.onBoldClick = this.onBoldClick.bind(this);
        this.onItalicClick = this.onItalicClick.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
    }
    
    private onTextChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        console.log(this.colorPicker.current.state.color)
        this.setState({text: event.target.value}, () => this.props.drawMeme())
    }

    private onTextSizeChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        this.setState({size: event.target.value}, () => this.props.drawMeme())
    }
    
    private onXChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        this.setState({x: parseInt(event.target.value)},  () => this.props.drawMeme())
    }

    private onYChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        this.setState({y: parseInt(event.target.value)},  () => this.props.drawMeme())
    }

    private onBoldClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        if (this.state.isBold === "bold")
            this.setState({isBold: ""},  () => this.props.drawMeme())
        else
            this.setState({isBold: "bold"},  () => this.props.drawMeme())
    }

    private onItalicClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        if (this.state.isItalic === "italic")
            this.setState({isItalic: ""},  () => this.props.drawMeme())
        else
            this.setState({isItalic: "italic"},  () => this.props.drawMeme())
    }

    private onColorChange(newHexColor: string) {
        this.setState({hexColor: newHexColor}, () => this.props.drawMeme())
    }

    render(){
        return (
            <div>
                <button  onClick = {this.onBoldClick}>B</button>
                <button  onClick = {this.onItalicClick}>I</button>
                <SketchColorPicker ref={this.colorPicker} onColorChange={this.onColorChange}></SketchColorPicker>

                <label htmlFor="text">{this.state.name}</label>
                <span>
                    <input id="text" type="text" onChange={this.onTextChange}></input>
                </span>

                <label htmlFor="size">Size</label>
                <span>
                    <input id="size" type="text" onChange={this.onTextSizeChange}></input>
                </span>
                <br/>

                <label htmlFor="x">X</label>
                <span><input id="x" type="number" value={this.state.x} onChange={this.onXChange}></input></span>
                <br/>
                <label htmlFor="y">Y</label>
                <span><input id="y" type="number" value={this.state.y} onChange={this.onYChange}></input></span>
                <br/>
            </div>
        )
      }

      
}
