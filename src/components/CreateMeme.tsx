import React from "react";
import { RouteComponentProps } from "react-router-dom";
import '../css/Display.css'
import UploadTemplate from "./UploadTemplate";
import UrlScreenshotTemplate from "./UrlScreenshotTemplate";



export default class CreateMeme extends React.Component<RouteComponentProps> {
    render() {
        return (
            <div className='displayWindow'>
                <h1>Create meme</h1>
                <UploadTemplate {...this.props}/>
                <UrlScreenshotTemplate {...this.props} />
            </div>
        );
    }
}
