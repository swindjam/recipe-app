import React, {useState, useEffect} from 'react';
import { Box, TextField, Paper, Button, Divider, Select, MenuItem, SelectChangeEvent, Alert } from '@mui/material';
import useRecipe from './hooks/useRecipe';
import Recipe from '../types/Recipe';
import Ingredient from '../types/Ingredient';
import postData from './helpers/postData';

interface Props {
    recipe?: Recipe | null;
    afterSubmit?: () => void;
    updateExistingRecipe: boolean;
};

const RecipeForm = ({ recipe: defaultRecipe, afterSubmit, updateExistingRecipe }: Props): JSX.Element => {
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

    const updateTotalIngredients = (event: React.SyntheticEvent) : void => {
        const target = event.target as HTMLInputElement;
        if (parseInt(String(target.value)) < recipe.ingredients.length && parseInt(String(target.value)) > 0) {
            removeIngredient(parseInt(String((target.value))) - 1);
        } else {
            updateIngredient(
                {
                    name: '',
                    amount: undefined,
                    unit: ''
                },
                parseInt(String(target.value)) - 1
            );
        }
    };

    const changeRecipe = (event: React.BaseSyntheticEvent) : void => {
        updateRecipe(event.target.id, event.target.value);
    };

    const changeIngredient = (event: React.SyntheticEvent | SelectChangeEvent) : void => {
        // Id for textfields, name for selects
        const target = event.target as HTMLInputElement;
        const id = target.id || target.name;
        const index = parseInt(id.replace(/-.*/, ''));
        const type = id.replace(/\d-/, '');

        let ingredient: Ingredient = {
            name: '',
            amount: undefined,
            unit: ''
        };
        const currentIngredient = recipe.ingredients[index];
        if(currentIngredient) {
            ingredient = {
                ...ingredient,
                ...currentIngredient
            };
        }

        updateIngredient(
            {
                ...ingredient,
                [type]: type === 'amount' ? parseInt(String(target.value)) : target.value
            },
            index
        )
    };

    const [message, setMessage] = useState('');
    const saveRecipe = () : void => {
        const recipeToSave: Recipe = {
            name: recipe.name,
            ingredients: recipe.ingredients,
            steps: (recipe.method || '').split('\n'),
            method: recipe.method
        };

        postData(`http://localhost:8081/${updateExistingRecipe ? 'update' : 'add'}`, {
            recipe: recipeToSave
        });
        afterSubmit && afterSubmit();
        setMessage('Recipe Saved!');
    };

    useEffect(() => {
        setTimeout(() => {
            setMessage('');
        }, 2000);
    }, [message]);

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', clear: 'both', margin: '20px' }}>
            {message && <Alert severity="info">{message}</Alert>}
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
                    <h3 style={{ fontFamily: 'cursive', marginLeft: '10px'}}>Ingredients</h3>
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
                                    <h4 style={{ fontFamily: 'cursive', marginLeft: '10px'}}>Ingredient {i + 1}</h4>
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
                    <h3 style={{ fontFamily: 'cursive', marginLeft: '10px'}}>Method</h3>
                    <TextField
                        style={{ width: "200px", margin: "5px" }}
                        type="text"
                        label="Method"
                        variant="outlined"
                        multiline
                        onInput={changeRecipe}
                        id='method'
                        value={recipe.method}
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
                    <Button
                        style={{ margin: "5px" }}
                        variant="contained"
                        color="secondary"
                        onClick={resetRecipe}
                    >
                        Reset
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default RecipeForm;