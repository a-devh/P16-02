import {Button, Fieldset, TextInput, Box, Center, PasswordInput} from '@mantine/core';

const Login = ({ onSuccess }) => {
    return (
        <Box>
            <Box className="BrickPic">
            </Box>

            <Box className="LoginWindow">
                <Center>
                    
                <Fieldset legend="Login">
                    <TextInput label="Email" placeholder="Email"/>
                    <PasswordInput label="Password" description="Password" placeholder="Password"/>
                </Fieldset>

                <Button variant="filled" radius="sm" onClick={onSuccess}>Login</Button>
                <text>Forgot Password?</text>
                </Center>
            </Box>
        </Box>
    );
};

export default Login;
