import { Link } from "react-router-dom";
import "../css/Display.css"

export default function Home() {
    return (
        <div className="displayWindow">
            <h1>Welcome</h1>
            <Link to="/meme/create">create meme</Link><br />
            <Link to="/meme/slideshow">meme slideshow</Link><br />
            <Link to="/meme/overview">meme overview</Link><br />
        </div>
    )
}
