import React from "react";
import {Button, Fieldset, TextInput, Box, Center} from '@mantine/core';
import "./AdminHomepage.css";
const AdminHomepage = () => {
    return (
        <div>
            <Box className="center-content">
                <div  className="page-content">
                    <Fieldset legend="Brick Admin">
                        <Button className="yellow-button">Catalog Bricks</Button>
                        <Button className="yellow-button">Review Records</Button>
                        <Button className="yellow-button">User Management</Button>
                    </Fieldset>
                </div>
            </Box>
            

        </div>
    );
};

export default AdminHomepage;