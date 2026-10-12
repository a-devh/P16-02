import { Button, Fieldset, Text, TextInput, Box, Center } from '@mantine/core'

const CatalogBricks = () => {
    return (
        <Box>
            <Box className="Center Content">
                <h1>Catalog Bricks</h1>
                <Center>
                <Fieldset legend="Add Brick">
                    <TextInput label="Name" placeholder=""/>
                    <TextInput label="Campus" placeholder=""/>
                    <TextInput label="Row" placeholder=""/>
                    <TextInput label="Row#" placeholder=""/>
                    <TextInput label="Inscription" placeholder=""/>

                    <Button>Add Brick</Button>
                    <Button>Clear</Button>

                    <Text>Import Brick</Text>
                    <Button>Select File</Button>
                </Fieldset>
                </Center>
            </Box>

        </Box>
    );
};

export default CatalogBricks;