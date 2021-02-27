import React from "react";
import { RouteComponentProps } from "react-router-dom";
import '../../css/Display.css'
import DrawTemplate from "./DrawTemplate";
import UploadTemplate from "./UploadTemplate";
import UrlScreenshotTemplate from "./UrlScreenshotTemplate";
import PopularTemplateSelector from "../meme/TemplateSelector";

import CameraPhotoTemplate from "./CameraPhotoTemplate";


export default class CreateTemplate extends React.Component<RouteComponentProps> {
    render() {
        return (
            <div className='displayWindow'>
                <h1>Create meme</h1>
                <UploadTemplate {...this.props} />
                <UrlScreenshotTemplate {...this.props} />
                <DrawTemplate {...this.props} />
                <h1>Popular Templates for <a href="https://imgflip.com/">imgflip</a></h1>
                <PopularTemplateSelector onChangeTemplate={(url) => {
                    const encodedUrl = encodeURIComponent(url);
                    this.props.history.push('/meme/edit/' + encodedUrl);
                }} />
                <CameraPhotoTemplate {...this.props} />
            </div>
        );
    }
}
