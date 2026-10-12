import React from "react";
import {Button, Fieldset, TextInput, Box, Center} from '@mantine/core';
const AdminHomepage = () => {
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
                <Center>

                </Center>

                



            </Box>

        </Box>
    );
};

export default AdminHomepage;