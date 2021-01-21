import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { apiEndpointUrl } from "../constants";

interface RouteParams {jwt: string}


interface User {
    id: string,
    username: string
}

export default function Profile(props: RouteComponentProps<RouteParams>) {
    const [user, setUser] = useState<null | User>(null);

    useEffect(() => {
        // Update the document title using the browser API
        //document.title = `You clicked ${count} times`;
        if (!props.match.params.jwt) {
            props.history.push('/login')
            return
        }

        console.log(props.match.params.jwt);
        
        fetch(apiEndpointUrl + 'user/me', {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + props.match.params.jwt
            }
        })
        .then(res => res.json()) 
        .then(json => {
            console.log(json);
            if (json.status) {
                setUser(json.data)
            }
        })
        .catch(err => console.log(err));
    }, [props.history, props.match.params.jwt]);


    if (user !== null) {
        return <div>
        <h1>Your Profile</h1>
        <ul>
            <li>your id: {user.id}</li>
            <li>your username: {user.username}</li>
        </ul>
        </div>
    }

    return <div>
        <h1>Your Profile</h1>
        <p>loading...</p>
    </div>

}