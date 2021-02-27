import React, { Component } from "react";
import SketchColorPicker from '../../js/SketchColorPicker';

interface Text {
    text: string,
    x: number,
    y: number,
    size: string,
    isBold: string
    isItalic: string
    hexColor: string
}

interface Props {
    text: Text
    onChange: (text: Text) => void
    onRemove: () => void
}

export default class TextEditor extends Component<Props> {
    constructor(props: Props) {
        super(props);

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

        const newText = Object.assign({}, this.props.text);
        newText.text = event.target.value;
        this.props.onChange(newText);
    }

    private onTextSizeChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        const newText = Object.assign({}, this.props.text);
        newText.size = event.target.value;
        this.props.onChange(newText);
    }
    
    private onXChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        const newText = Object.assign({}, this.props.text);
        newText.x = parseInt(event.target.value);
        this.props.onChange(newText);
    }

    private onYChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        const newText = Object.assign({}, this.props.text);
        newText.y = parseInt(event.target.value);
        this.props.onChange(newText);
    }

    private onBoldClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        let isBold = "";
        if (this.props.text.isBold === "bold") {
            isBold = "";
        } else {
            isBold = "bold";
        }

        const newText = Object.assign({}, this.props.text);
        newText.isBold = isBold;
        this.props.onChange(newText);
    }

    private onItalicClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        
        let isItalic = "";
        if (this.props.text.isItalic === "italic") {
            isItalic = "";
        } else {
            isItalic = "italic";
        }

        const newText = Object.assign({}, this.props.text);
        newText.isItalic = isItalic;
        this.props.onChange(newText);
    }

    private onColorChange(newHexColor: string) {
        const newText = Object.assign({}, this.props.text);
        newText.hexColor = newHexColor;
        this.props.onChange(newText);
    }

    render(){
        return (
            <div>
                <button  onClick = {this.onBoldClick}>B</button>
                <button  onClick = {this.onItalicClick}>I</button>
                <SketchColorPicker onColorChange={this.onColorChange}></SketchColorPicker>

                <label htmlFor="text">Text</label>
                <span>
                    <input id="text" type="text" onChange={this.onTextChange} value={this.props.text.text}></input>
                </span>

                <label htmlFor="size">Size</label>
                <span>
                    <input id="size" type="number" onChange={this.onTextSizeChange} value={this.props.text.size}></input>
                </span>
                <br/>

                <label htmlFor="x">X</label>
                <span><input id="x" type="number" value={this.props.text.x} onChange={this.onXChange}></input></span>
                <br/>
                <label htmlFor="y">Y</label>
                <span><input id="y" type="number" value={this.props.text.y} onChange={this.onYChange}></input></span>
                <br/>
                <button onClick={this.props.onRemove}>Remove</button>
            </div>
        )
      }

      
}
