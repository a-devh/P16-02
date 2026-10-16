import { Button, Fieldset, Text, TextInput, Box, Center, Flex } from '@mantine/core'
import '@mantine/core/styles.css';
import "./CatalogBricks.css";
const CatalogBricks = () => {
    return (
        <div className="main">
            <Box className="center-content">
                
                <div  className="pageContent">
                <Fieldset legend="Add Brick">
                    <TextInput label="Name" placeholder=""/>
                    <TextInput label="Campus" placeholder=""/>
                    <TextInput label="Row" placeholder=""/>
                    <TextInput label="Row#" placeholder=""/>
                    <TextInput label="Inscription" placeholder=""/>

                    <Button className="yellow-button">Add Brick</Button>
                    <Button className="yellow-button">Clear</Button>

                    <Text>Import Brick</Text>
                    <Button className="yellow-button">Select File</Button>
                </Fieldset>
                </div>
            </Box>

        </div>
    );
};

export default CatalogBricks;