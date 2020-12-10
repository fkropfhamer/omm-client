import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <h1>Welcome</h1>
            <Link to="/create-meme">create meme</Link><br />
            <Link to="/meme-slideshow">meme slideshow</Link><br />
            <Link to="/meme-overview">meme overview</Link><br />
        </div>
    )
}
