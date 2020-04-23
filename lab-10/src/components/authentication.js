import React from 'react';
import {loginUser, registerUser} from '../server-bridge';

export const Authentication = props => {
    const getFieldsValue = () => {
        return {
            username: document.getElementById("username").value,
            password: document.getElementById("pass").value
        }
    };

    const register = () => {
        const data = getFieldsValue();
        registerUser(data)
            .then(result => {
                alert(result.statusText);
            });
    };

    const login = () => {
        const data = getFieldsValue();
        loginUser(data)
            .then(function (response) {
                localStorage.setItem("token", response.data);
                alert("Authenticated");
            })
            .catch(function (error) {
                alert(error);
            });
    };

    return (
        <div className="panel">
            <form>
                <label htmlFor="username">Username</label>
                <br/>
                <input type="text" id="username" name="username"/>
                <br/><br/>
                <label htmlFor="pass">Password</label>
                <br/>
                <input type="password" id="pass" name="pass"/>
                <br/><br/>
                <input type="button" value="Submit" onClick={login}/>
                <input type="button" value="Register" onClick={register}/>
            </form>
        </div>
    );
};