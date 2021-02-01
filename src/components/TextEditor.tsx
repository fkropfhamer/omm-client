import React, { Component } from "react";

interface Props {
    name: string
    x: number,
    y: number
}
interface State {
    name: string,
    text: string,
    x: number,
    y: number,
    size: string,
    isBold: boolean
    isItalic: boolean
}

export default class TextEditor extends Component<Props, State> {
    constructor(props: State) {
        super(props);

        this.state = {
            name: this.props.name,
            text: "",
            x: this.props.x,
            y: this.props.y,
            size: "50",
            isBold: false,
            isItalic: false
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onTextSizeChange = this.onTextSizeChange.bind(this);
        this.onXChange = this.onXChange.bind(this);
        this.onYChange = this.onYChange.bind(this);
    }
    
    private onTextChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        this.setState({text: event.target.value})
    }

    private onTextSizeChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        this.setState({size: event.target.value})
    }
    
    private onXChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        this.setState({x: parseInt(event.target.value)})
    }

    private onYChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        this.setState({y: parseInt(event.target.value)})
    }

    render(){
        return (
            <div>
                <button  onClick = { () => this.setState({isBold: !this.state.isBold})}>B</button>
                <button  onClick = { () => this.setState({isItalic: !this.state.isItalic})}>I</button>

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
