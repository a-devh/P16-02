//This screen displays the login UI

import React from "react";
import {Button, Fieldset, TextInput} from '@mantine/core';

const Login = () => {
    return (
        <Box>
            {/* */}
            <div className="TopBar">
            {/* Top Bar contains the navigation features */}
            </div>

            <div className="BrickPic">
            {/*This contains the brick banner bicture as well as the "Legacy Brick Admin" text */}
            </div>

            <div className="LoginWindow">
            {/*This contains the components for the login features, */}
                <h1>Login</h1>
                <Fieldset legend="Login">
                    <TextInput label="Email" placeholder="Email"/>
                    <TextInput label="Password" placeholder="Password"/>
                </Fieldset>
                <button variant="filled" radius="sm">Login</button>
                <text>Forgot Password?</text>
            </div>

        </Box>
    );
};

export default Login;