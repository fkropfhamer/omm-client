import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function logIn() {
        console.log('logging in!')
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={() => logIn()}>
                username: <input type="text" onChange={(event: React.FormEvent<HTMLInputElement>) => setUsername(event.currentTarget.value)} value={username}/>
                password: <input type="password" onChange={(event: React.FormEvent<HTMLInputElement>) => setPassword(event.currentTarget.value)} value={password}/>
                <button type="submit">log in</button>
            </form>
        </div>
    )
}