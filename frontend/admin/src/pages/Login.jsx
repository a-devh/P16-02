//This screen displays the login UI

import React from "react";
import {Button, Fieldset, TextInput, Box, Center} from '@mantine/core';

const Login = () => {
    return (
        <Box>
            {/* */}
            <Box className="TopBar">
            {/* Top Bar contains the navigation features */}
            </Box>

            <Box className="BrickPic">
            {/*This contains the brick banner bicture as well as the "Legacy Brick Admin" text */}
            </Box>

            <Box className="LoginWindow">
            {/*This contains the components for the login features, */}
                <Center>
                    
                <Fieldset legend="Login">
                    <TextInput label="Email" placeholder="Email"/>
                    <TextInput label="Password" placeholder="Password"/>
                </Fieldset>

                <Button variant="filled" radius="sm">Login</Button>
                <text>Forgot Password?</text>
                </Center>

            </Box>

        </Box>
    );
};

export default Login;