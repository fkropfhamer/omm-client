import * as mobilenet from '@tensorflow-models/mobilenet';

export default async function classify(img: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement) {
    const model = await mobilenet.load({version: 2, alpha: 0.5});
    const predictions = await model.classify(img);
    return predictions;
}