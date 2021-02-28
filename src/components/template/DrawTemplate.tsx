import DrawOnCanvas from "draw-on-canvas-react";
import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { apiEndpointUrl } from "../../constants";
import SketchColorPicker from "../../js/SketchColorPicker";

interface State {
    strokeWeight: number
}

export default class DrawTemplate extends Component<RouteComponentProps, State> {
    private ref: DrawOnCanvas | null
    private setRef: (instance: DrawOnCanvas | null) => void

    constructor(props: RouteComponentProps) {
        super(props);

        this.ref = null;

        this.setRef = (instance: DrawOnCanvas | null) => {
            this.ref = instance;
        };

        this.state = {
            strokeWeight: 5
        }

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
                const encodedUrl =  encodeURIComponent(apiEndpointUrl + 'template/image/' + json.data.id);
                this.props.history.push('/meme/edit/' + encodedUrl);
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
        let value = parseInt(event.target.value)

        if (value < 1) {
            value = 1;
        }

        this.setState({strokeWeight: value})

        this.changeStrokeWeight(value);
    }

    render() {
        return (
            <div>
                <h2>Draw template</h2>
                <DrawOnCanvas width={500} height={500} strokeColor="#F17013" strokeWeight={5} backgroundColor="grey" ref={this.setRef}/>
                Strokeweight: <input type="number" onChange={this.onStrokeWeightChange} defaultValue={5} value={this.state.strokeWeight}/>
                <SketchColorPicker onColorChange={this.onColorChange} />
                <button onClick={() => this.reset()}>reset</button>
                <button onClick={() => this.save()}>SAVE</button>
            </div>
        )
    }
}
