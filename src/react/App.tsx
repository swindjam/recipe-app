import React, { useState } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { Tabs, Tab, Box, Avatar } from '@mui/material';
import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';
import {Recipe} from '../types/Recipe';

interface Props {
    recipes: Recipe[]
}

const App = ({ recipes }: Props): JSX.Element => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <StyledEngineProvider>
            <Box sx={{
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <h1 style={{ fontFamily: 'cursive', marginRight: '10px' }}>Chef Luigi&apos;s Recipes</h1>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Avatar alt="Chef Luigi" src="http://localhost:8080/build/img/chef.jpg" sx={{ width: 130, height: 130, float: 'left', padding: '10px' }} />
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Recipes" />
                    <Tab label="Add Recipe" />
                </Tabs>
            </Box>
            {(() => {
                switch (value) {
                    case 0:
                        return (
                            <RecipeList recipes={recipes} />
                        );
                    case 1:
                        return (
                            <RecipeForm updateExistingRecipe={false}/>
                        );
                }
            })()}
        </StyledEngineProvider>
    );
};

export default App;