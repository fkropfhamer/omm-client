import { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { apiEndpointUrl } from "../constants";

export default function Login(props: RouteComponentProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    function isValid() {
        if (username === "") {
            return false;
        }

        if (password === "") {
            return false;
        }

        return true;
    }

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log('logging in!')
        setMessage("");

        if (isValid()) {
            const data = {
                username,
                password
            }

            fetch(apiEndpointUrl + 'user/authenticate', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json()) 
            .then(json => {
                console.log(json);
                if (json.status) {
                    props.history.push('/profile/' + json.token);
                    return
                }
                
                setMessage("Username or password is wrong!")
            })
            .catch(err => console.log(err));
        }
    }

    return (
        <div>
            <h1>Login</h1>
            {message}
            <form onSubmit={onSubmit}>
                username: <input type="text" onChange={(event: React.FormEvent<HTMLInputElement>) => setUsername(event.currentTarget.value)} value={username}/>
                password: <input type="password" onChange={(event: React.FormEvent<HTMLInputElement>) => setPassword(event.currentTarget.value)} value={password}/>
                <button type="submit">log in</button>
            </form>
        </div>
    )
}