import React, { useReducer, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, List, ListItem, ListItemText, Tooltip, IconButton, TextField, Button, Modal } from '@mui/material';
import Recipe from '../types/Recipe';
import Ingredient from '../types/Ingredient';
import { Delete, Edit } from '@mui/icons-material';
import getData from './helpers/getData';
import postData from './helpers/postData';
import useValues from './hooks/useValues';
import RecipeForm from './RecipeForm';
import getTarget from './helpers/getTarget';

interface Props {
    recipes: Recipe[]
};

const RecipeList = ({ recipes: defaultRecipes }: Props): JSX.Element => {
    if (!defaultRecipes) {
        defaultRecipes = [];
    }

    const [recipes, setRecipes] = useState(defaultRecipes);
    const [search, updateSearch] = useValues({
        recipeName: '',
        ingredient: ''
    });

    const changeSearch = (event: React.SyntheticEvent) => {
        updateSearch(event.target.id, event.target.value);
    };

    const searchRecipes = async () => {
        const queryParts = [];
        if (search.recipeName) {
            queryParts.push(`recipe_name=${search.recipeName}`);
        }

        if (search.ingredient) {
            queryParts.push(`ingredient=${search.ingredient}`);
        }
        const query = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';

        const response = await getData(`/search${query}`);
        setRecipes(response.recipes);
    };

    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const showEditRecipeModal = (event: React.SyntheticEvent) => {
        const target = getTarget(event);

        setShowEditModal(true);
        setSelectedRecipe(recipes.find(r => r.name === target.id));
    };
    const closeEditModal = () => {
        setShowEditModal(false);
    };
    
    const deleteRecipe = async (event: React.SyntheticEvent) => {
        const target = getTarget(event);

        await postData('/delete', {
            recipe_name: target.id
        });
    };

    return (
        <div>
            {<Modal
                open={showEditModal}
                onClose={closeEditModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <RecipeForm {...{ recipe: selectedRecipe, afterSubmit: closeEditModal }} />
                </Box>
            </Modal>}
            <Paper sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
            }}>
                <TextField
                    style={{ width: "200px", margin: "5px" }}
                    type="text"
                    label="Recipe Name"
                    variant="outlined"
                    value={search.recipeName}
                    onInput={changeSearch}
                    id='recipeName'
                />
                <TextField
                    style={{ width: "200px", margin: "5px" }}
                    type="text"
                    label="Ingredient Name"
                    variant="outlined"
                    value={search.ingredient}
                    onInput={changeSearch}
                    id='ingredient'
                />
                <Button
                    style={{ margin: "5px" }}
                    variant="contained"
                    color="primary"
                    onClick={searchRecipes}
                >
                    Search
                </Button>
            </Paper>
            <br />
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
                                            <IconButton onClick={showEditRecipeModal} id={recipe.name}>
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton onClick={deleteRecipe} id={recipe.name}>
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
        </div >
    );
};

export default RecipeList;