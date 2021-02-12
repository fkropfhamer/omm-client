import React from "react";
import { RouteComponentProps } from "react-router-dom";
import '../../css/Display.css'
import DrawTemplate from "./DrawTemplate";
import UploadTemplate from "./UploadTemplate";
import UrlScreenshotTemplate from "./UrlScreenshotTemplate";



export default class CreateTemplate extends React.Component<RouteComponentProps> {
    render() {
        return (
            <div className='displayWindow'>
                <h1>Create meme</h1>
                <UploadTemplate {...this.props} />
                <UrlScreenshotTemplate {...this.props} />
                <DrawTemplate {...this.props} />
                <CameraPhotoTemplate {...this.props} />
            </div>
        );
    }
}
