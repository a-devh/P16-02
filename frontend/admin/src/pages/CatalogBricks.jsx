import React from "react";
import {Button, Fieldset, TextInput, Box} from '@mantine/core';
const CatalogBricks = () => {
    return (
        <Box>
            {/* */}
            <Box className="TopBar">
            {/* Top Bar contains the navigation features */}
            </Box>

            <Box className="BrickPic">
            {/*This contains the brick banner bicture as well as the "Legacy Brick Admin" text */}
                <Text>Brick Admin</Text>
                <Button>Catalog Bricks</Button>
                <Button>Review Records</Button>
                <Button>User Management</Button>
                <Button>Sign Out</Button>
            </Box>

            <Box className="Center Content">
            {/*This contains the components for the Add Brick features, */}
                <Fieldset legend="Add Brick">
                    <TextInput label="Name" placeholder=""/>
                    <TextInput label="Campus" placeholder=""/>
                    <TextInput label="Row" placeholder=""/>
                    <TextInput label="Row#" placeholder=""/>
                    <TextInput label="Inscription" placeholder=""/>

                    <Button>Add Brick</Button>
                    <Button>Clear</Button>

                    <text>import Brick</text>
                    <Button>Select File</Button>
                </Fieldset>
                



            </Box>

        </Box>
    );
};

export default CatalogBricks;