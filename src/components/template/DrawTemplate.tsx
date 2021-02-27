import DrawOnCanvas from "draw-on-canvas-react";
import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { apiEndpointUrl } from "../../constants";


export default class DrawTemplate extends Component<RouteComponentProps> {
    private ref: DrawOnCanvas | null
    private setRef: (instance: DrawOnCanvas | null) => void

    constructor(props: RouteComponentProps) {
        super(props);

        this.ref = null;

        this.setRef = (instance: DrawOnCanvas | null) => {
            this.ref = instance;
        };
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

    render() {
        return (
            <div>
                <h2>Draw template</h2>
                <DrawOnCanvas width={500} height={500} strokeColor="black" strokeWeight={5} backgroundColor="grey" ref={this.setRef}/>
                <button onClick={() => this.changeStrokeWeight(5)}>5</button>
                <button onClick={() => this.changeStrokeWeight(10)}>10</button>
                <button onClick={() => this.changeStrokeColor('black')}>black</button>
                <button onClick={() => this.changeStrokeColor('green')}>green</button>
                <button onClick={() => this.changeStrokeColor('blue')}>blue</button>
                <button onClick={() => this.changeStrokeColor('red')}>red</button>
                <button onClick={() => this.reset()}>reset</button>
                <button onClick={() => this.save()}>SAVE</button>
            </div>
        )
    }
}
