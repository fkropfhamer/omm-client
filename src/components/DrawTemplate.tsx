import DrawOnCanvas from "draw-on-canvas-react";
import { Component } from "react";

interface Props {}

export default class DrawTemplate extends Component<Props> {
    private ref: DrawOnCanvas | null
    private setRef: (instance: DrawOnCanvas | null) => void

    constructor(props: Props) {
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

    render() {
        return (
            <div>
                <h1>Draw template</h1>
                <DrawOnCanvas width={500} height={500} strokeColor="black" strokeWeight={5} backgroundColor="white" ref={this.setRef}/>
                <button onClick={() => this.changeStrokeWeight(5)}>5</button>
                <button onClick={() => this.changeStrokeWeight(10)}>10</button>
                <button onClick={() => this.changeStrokeColor('black')}>black</button>
                <button onClick={() => this.changeStrokeColor('green')}>green</button>
                <button onClick={() => this.changeStrokeColor('blue')}>blue</button>
                <button onClick={() => this.changeStrokeColor('red')}>red</button>
            </div>
        )
    }
}
