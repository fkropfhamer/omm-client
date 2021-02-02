import DrawOnCanvas from "draw-on-canvas-react";
import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { apiEndpointUrl } from "../../constants";
import SketchColorPicker from "../../js/SketchColorPicker";


export default class DrawTemplate extends Component<RouteComponentProps> {
    private ref: DrawOnCanvas | null
    private setRef: (instance: DrawOnCanvas | null) => void

    constructor(props: RouteComponentProps) {
        super(props);

        this.ref = null;

        this.setRef = (instance: DrawOnCanvas | null) => {
            this.ref = instance;
        };

        this.onColorChange = this.onColorChange.bind(this);
    }

    changeStrokeColor(color: string) {
        this.ref?.changeStrokeColor(color);
    }

    changeStrokeWeight(weight: number) {
        this.ref?.changeStrokeWeight(weight);
    }

    save() {
        //TODO: update draw-on-canvas package to expose canvas.toBlob()

        (this.ref as any).draw.canvas.toBlob((blob: any) => {
            const data = new FormData();
            data.append("template", blob);

            fetch(apiEndpointUrl + 'template', {
                method: "POST",
                body: data
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.props.history.push('/meme/edit/' + json.data.id)
            })
            .catch(err => console.log(err));
        })
    }

    reset() {
        this.ref?.reset();
    }

    private onColorChange(newHexColor: string) {
        this.changeStrokeColor(newHexColor)
    }

    private onStrokeWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.changeStrokeWeight(parseInt(event.target.value));
    }

    render() {
        return (
            <div>
                <h2>Draw template</h2>
                <DrawOnCanvas width={500} height={500} strokeColor="black" strokeWeight={5} backgroundColor="grey" ref={this.setRef}/>
                Strokeweight: <input type="number" onChange={this.onStrokeWeightChange} defaultValue={5}></input>
                <SketchColorPicker onColorChange={this.onColorChange}></SketchColorPicker>
                <button onClick={() => this.reset()}>reset</button>
                <button onClick={() => this.save()}>SAVE</button>
            </div>
        )
    }
}
