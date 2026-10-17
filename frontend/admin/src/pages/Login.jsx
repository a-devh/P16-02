import {Button, Fieldset, TextInput, Box, Center, PasswordInput, Container} from '@mantine/core';
import '@mantine/core/styles.css';
import "./Login.css";
const Login = ({ onSuccess }) => {
    return (
        <div className="main">
            <Box className="center-content">
                
                <div  className="page-content">
                <Fieldset legend="Login">
                    <TextInput label="Email" placeholder="Email"/>
                    <PasswordInput label="Password" placeholder="Password"/>
                    <Button variant="filled" radius="sm" onClick={onSuccess} className="yellow-button">Login Text</Button>
                    <text className="pass-text">Forgot Password?</text>
                </Fieldset>
                </div>
            </Box>

        </div>
    );
};

export default Login;
