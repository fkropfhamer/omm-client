import React from "react";
import {RouteComponentProps} from "react-router-dom";
import {apiEndpointUrl} from "../../constants";
import Webcam from "react-webcam";
import '../../css/Display.css'

export default class CameraPhotoTemplate extends React.Component<RouteComponentProps, { webcam: Webcam }> {
    setRef = (webcam) => {
        this.setState({webcam: webcam})
    }

    capturePhoto = () => {
        const photo = this.state.webcam.getScreenshot({width: 500, height: 500});
        const blob = this.convertToBlob(photo);
        const data = new FormData();
        data.append("template", blob)

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
    }
    convertToBlob = (dataurl) => {
        var dataArr = dataurl.split(','), mime = dataArr[0].match(/:(.*?);/)[1],
            bstr = atob(dataArr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    }

    render() {
        const videoConstraints = {
            width: 500,
            height: 500,
            facingMode: "user"
        };
        return (
            <div>
                <h1>Capture photo from connected camera</h1>


                <Webcam style={{justifyContent: 'center'}}
                        audio={false}
                        height={500}
                        ref={this.setRef}
                        screenshotFormat="image/jpeg"
                        width={500}
                        videoConstraints={videoConstraints}
                />
                <br/>
                <button onClick={this.capturePhoto}>Capture photo</button>
            </div>
        );
    }
}
