import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, List, ListItem, ListItemText, Tooltip, IconButton } from '@mui/material';
import Recipe from '../types/Recipe';
import Ingredient from '../types/Ingredient';
import { Delete, Edit } from '@mui/icons-material';
import getData from './helpers/getData';
import postData from './helpers/postData';

interface Props {
    recipes: Recipe[]
};

const RecipeList = ({recipes: defaultRecipes}: Props): JSX.Element => {
    const [recipes, setRecipes] = useState(defaultRecipes);

    const searchRecipes = async () => {
        // TODO support filtering
        const response = await getData('/search');
        setRecipes(response.recipes);
    };

    const editRecipe = async () => {
        // TODO show modal
    };

    const deleteRecipe = async () => {
        await postData('/delete', {
            recipe_name: event?.target.id
        });
    };

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Recipe</TableCell>
                            <TableCell>Ingredients</TableCell>
                            <TableCell>Method</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recipes.map((recipe: Recipe) => (
                            <TableRow
                                key={recipe.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {recipe.name}
                                </TableCell>
                                <TableCell>
                                    <List>
                                        {recipe.ingredients.map((ingredient: Ingredient) => (
                                            <ListItem disablePadding key={ingredient.name}>
                                                <ListItemText primary={`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </TableCell>
                                <TableCell>
                                    <List>
                                        {recipe.steps.map((step: string, index: number) => (
                                            <ListItem disablePadding key={step}>
                                                <ListItemText primary={`${(index + 1)}. ${step}`} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </TableCell>
                                <TableCell>
                                    <Tooltip title="Edit">
                                        <IconButton onClick={editRecipe}>
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton onClick={deleteRecipe}>
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default RecipeList;