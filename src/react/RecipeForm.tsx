import React from 'react';
import { Box, TextField, Paper, Button, Divider, Select, MenuItem } from '@mui/material';
import useRecipe from './hooks/useRecipe';
import Recipe from '../types/Recipe';
import postData from './helpers/postData';

interface Props {
    defaultRecipe?: Recipe | null;
    afterSubmit?: () => void;
};

const RecipeForm = ({ defaultRecipe, afterSubmit }: Props): JSX.Element => {
    if (!defaultRecipe) {
        defaultRecipe = {
            name: '',
            ingredients: [
                {
                    name: '',
                    amount: null,
                    unit: ''
                }
            ],
            method: '',
            steps: []
        };
    }
    const [recipe, updateRecipe, updateIngredient, removeIngredient, resetRecipe] = useRecipe(defaultRecipe);

    const updateTotalIngredients = (event: React.SyntheticEvent) => {
        if (event.target.value < recipe.ingredients.length && event.target.value > 0) {
            removeIngredient((event.target.value - 1));
        } else {
            updateIngredient(
                {
                    name: '',
                    amount: undefined,
                    unit: ''
                },
                (event.target.value - 1)
            );
        }
    };

    const changeRecipe = (event: React.BaseSyntheticEvent) => {
        updateRecipe(event.target.id, event.target.value);
    };

    const changeIngredient = (event: React.FormEvent) => {
        // Id for textfields, name for selects
        const id = event.target.id || event.target.name;
        const index = id.replace(/-.*/, '');
        const type = id.replace(/\d-/, '');

        updateIngredient(
            {
                [type]: type === 'amount' ? parseInt(event.target.value) : event.target.value
            },
            index
        )
    };

    const saveRecipe = () => {
        const recipeToSave: Recipe = {
            name: recipe.name,
            ingredients: recipe.ingredients,
            steps: recipe.method.split('\n'),
            method: recipe.method
        };

        postData('/save', {
            recipe: recipeToSave
        });
        afterSubmit && afterSubmit();
    };

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Paper>
                <form>
                    <TextField
                        style={{ width: "200px", margin: "5px" }}
                        type="text"
                        label="Recipe Name"
                        variant="outlined"
                        value={recipe.name}
                        onInput={changeRecipe}
                        id='name'
                    />
                    <Divider />
                    <h3>Ingredients</h3>
                    <TextField
                        style={{ width: "200px", margin: "5px" }}
                        type="number"
                        label="Number of Ingredients"
                        variant="outlined"
                        InputProps={{ inputProps: { min: 0 } }}
                        value={recipe.ingredients.length}
                        onInput={updateTotalIngredients}
                    />
                    <br />
                    {(() => {
                        const result = [];

                        for (let i = 0; i < recipe.ingredients.length; i++) {
                            result.push(
                                <div key={i}>
                                    <h4>Ingredient {i + 1}</h4>
                                    <TextField
                                        style={{ width: "200px", margin: "5px" }}
                                        type="text"
                                        label="Ingredient Name"
                                        variant="outlined"
                                        onInput={changeIngredient}
                                        id={`${i}-name`}
                                        value={recipe.ingredients[i].name}
                                    />
                                    <br />
                                    <TextField
                                        style={{ width: "200px", margin: "5px" }}
                                        type="number"
                                        label="Ingredient Amount"
                                        variant="outlined"
                                        onInput={changeIngredient}
                                        id={`${i}-amount`}
                                        value={recipe.ingredients[i].amount}
                                    />
                                    <br />
                                    <Select
                                        style={{ width: "200px", margin: "5px" }}
                                        label="Ingredient Unit"
                                        name={`${i}-unit`}
                                        value={recipe.ingredients[i].unit}
                                        onChange={changeIngredient}
                                    >
                                        <MenuItem value='grams'>grams</MenuItem>
                                        <MenuItem value='ml'>ml</MenuItem>
                                        <MenuItem value='tsp'>tsp</MenuItem>
                                    </Select>
                                    <br />
                                </div>
                            )
                        }

                        return result;
                    })()}

                    <Divider />
                    <h3>Method</h3>
                    <TextField
                        style={{ width: "200px", margin: "5px" }}
                        type="text"
                        label="Method"
                        variant="outlined"
                        multiline
                        onInput={changeRecipe}
                        id='method'
                    />
                    <br />
                    <br />
                    <Button
                        style={{ margin: "5px" }}
                        variant="contained"
                        color="primary"
                        onClick={saveRecipe}
                    >
                        Save
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default RecipeForm;