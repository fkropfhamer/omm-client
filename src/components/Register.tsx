import { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { apiEndpointUrl } from "../constants";

export default function Register(props: RouteComponentProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    
    function isValid() {
        if (username === '') {
            return false;
        }

        if (password === '') {
            return false;
        }

        if (password !== repeatedPassword) {
            return false;
        }

        return true;
    }

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = {
            username,
            password
        }

        if (isValid()) {
            fetch(apiEndpointUrl + 'user', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json()) 
            .then(json => {
                console.log(json);
                if (json.status) {
                    props.history.push('/login')
                }
            })
            .catch(err => console.log(err));
        }
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
