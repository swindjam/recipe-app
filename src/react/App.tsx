import React, { useState } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import {Tabs, Tab, Box} from '@mui/material';
import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';
import Recipe from '../types/Recipe';

interface Props {
    recipes: Recipe[]
};

const App = ({recipes} : Props): JSX.Element => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <StyledEngineProvider>
            <h1>Recipe App</h1>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Recipes" />
                    <Tab label="Add Recipe" />
                </Tabs>
            </Box>
            {(() => {
                switch (value) {
                    case 0:
                        return (
                            <RecipeList recipes={recipes}/>
                        );
                    case 1:
                        return (
                            <RecipeForm />
                        );
                }
            })()}
        </StyledEngineProvider>
    );
};

export default App;