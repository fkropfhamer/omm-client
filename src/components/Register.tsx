import { useState } from "react";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    
    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("registering!")
    }
    
    
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                username: <input type="text" value={username} onChange={(event: React.FormEvent<HTMLInputElement>) => setUsername(event.currentTarget.value)}/>
                password: <input type="password" value={password} onChange={(event: React.FormEvent<HTMLInputElement>) => setPassword(event.currentTarget.value)}/>
                password repeated: <input type="password" value={repeatedPassword} onChange={(event: React.FormEvent<HTMLInputElement>) => setRepeatedPassword(event.currentTarget.value)}/>
                <button type="submit">register</button>
            </form>
        </div>
    )
}
