import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import "../css/Display.css"
import VoiceControlButton from "./VoiceControlButton";

export default function Home(props: RouteComponentProps) {
    function onSpeech(result: string) {
        if (result.includes('slideshow')) {
            props.history.push('/meme/slideshow');
        }

        if (result.includes('create')) {
            props.history.push('/template/create');
        }

        if (result.includes('overview')) {
            props.history.push('/meme/overview');
        }

        if (result.includes('login')) {
            props.history.push('/login');
        }

        if (result.includes('register')) {
            props.history.push('/register');
        }

        if (result.includes('about')) {
            props.history.push('/about');
        }
    }

    return (
        <div className="displayWindow">
            <h1>Welcome</h1>
            <Link to="/template/create">create meme</Link><br />
            <Link to="/meme/slideshow">meme slideshow</Link><br />
            <Link to="/meme/overview">meme overview</Link><br />
            <Link to="/register">register</Link><br />
            <Link to="/login">login</Link><br />
            <Link to="/about">about</Link><br />
            <VoiceControlButton onSpeech={onSpeech} />
        </div>
    )
}
