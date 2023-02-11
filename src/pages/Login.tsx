import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export interface ILoginProps {
}

export default function Login (props: ILoginProps) {

    // user object that consist of username string and password string
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    // function that handles the change of the input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    }

    // function that handles the submit of the form
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        axios.post("http://localhost:5000/login", user)
        .then(res => {
            console.log(res);
            // if successful, redirect to /artists
            if (res.status === 200) {
                window.location.href = "/artists";
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <>
        <h1>Login</h1>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" name="username" onChange={handleChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Login
                </Button>
            </Form>
        </>
    );
}
