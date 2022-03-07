var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define("types/Ingredient", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
});
define("types/Recipe", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
});
define("react/helpers/getData", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = (url = '') => __awaiter(void 0, void 0, void 0, function* () {
        // Default options are marked with *
        const response = yield fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
        return response.json(); // parses JSON response into native JavaScript objects
    });
});
define("react/helpers/postData", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = (url = '', data = {}) => __awaiter(void 0, void 0, void 0, function* () {
        // Default options are marked with *
        yield fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
    });
});
define("types/ValuesStateAction", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
});
define("react/hooks/objectReducer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = (state, action) => {
        const { type, property, value } = action;
        switch (type) {
            case 'update':
                if (property) {
                    return Object.assign(Object.assign({}, state), { [property]: value });
                }
                return state;
            case 'reset':
                return state;
            default:
                return state;
        }
    };
});
define("react/hooks/useValues", ["require", "exports", "react", "react/hooks/objectReducer"], function (require, exports, react_1, objectReducer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    objectReducer_1 = __importDefault(objectReducer_1);
    function useValues(defaultValues) {
        const [values, updateValues] = (0, react_1.useReducer)(objectReducer_1.default, defaultValues);
        return [
            values,
            (property, value) => {
                updateValues({
                    type: 'update',
                    property,
                    value
                });
            }
        ];
    }
    exports.default = useValues;
});
define("types/RecipeStateAction", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
});
define("react/hooks/recipeReducer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = (state, action) => {
        const { type, property, value, recipe, index, ingredient } = action;
        switch (type) {
            case 'update':
                if (property) {
                    return Object.assign(Object.assign({}, state), { [property]: value });
                }
                return state;
            case 'updateIngredient':
                if (index && ingredient) {
                    let newIngredients = state.ingredients.slice();
                    const existingIngredient = (state.ingredients[index] || { name: '', amount: null, unit: '' });
                    newIngredients[index] = Object.assign(Object.assign({}, existingIngredient), ingredient);
                    return Object.assign(Object.assign({}, state), { ingredients: newIngredients });
                }
                return state;
            case 'removeIngredient':
                if (typeof index === 'number') {
                    return Object.assign(Object.assign({}, state), { ingredients: state.ingredients.slice(0, index + 1) });
                }
                return state;
            case 'reset':
                if (recipe) {
                    return recipe;
                }
                return state;
            default:
                return state;
        }
    };
});
define("react/hooks/useRecipe", ["require", "exports", "react", "react/hooks/recipeReducer"], function (require, exports, react_2, recipeReducer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    recipeReducer_1 = __importDefault(recipeReducer_1);
    function useRecipe(defaultRecipe) {
        const [recipe, updateRecipe] = (0, react_2.useReducer)(recipeReducer_1.default, defaultRecipe);
        return [
            recipe,
            (property, value) => {
                updateRecipe({
                    type: 'update',
                    property,
                    value
                });
            },
            (ingredient, index) => {
                updateRecipe({
                    type: 'updateIngredient',
                    index,
                    ingredient,
                    recipe: defaultRecipe
                });
            },
            (index) => {
                updateRecipe({
                    type: 'removeIngredient',
                    index
                });
            },
            () => {
                updateRecipe({
                    type: 'reset',
                    recipe: defaultRecipe
                });
            }
        ];
    }
    exports.default = useRecipe;
});
define("react/RecipeForm", ["require", "exports", "react", "@mui/material", "react/hooks/useRecipe", "react/helpers/postData"], function (require, exports, react_3, material_1, useRecipe_1, postData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    react_3 = __importDefault(react_3);
    useRecipe_1 = __importDefault(useRecipe_1);
    postData_1 = __importDefault(postData_1);
    ;
    const RecipeForm = ({ defaultRecipe, afterSubmit }) => {
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
        const [recipe, updateRecipe, updateIngredient, removeIngredient, resetRecipe] = (0, useRecipe_1.default)(defaultRecipe);
        const updateTotalIngredients = (event) => {
            if (parseInt(String(event.currentTarget.nodeValue)) < recipe.ingredients.length && parseInt(String(event.currentTarget.nodeValue)) > 0) {
                removeIngredient(parseInt(String((event.currentTarget.nodeValue))) - 1);
            }
            else {
                updateIngredient({
                    name: '',
                    amount: undefined,
                    unit: ''
                }, parseInt(String(event.currentTarget.nodeValue)) - 1);
            }
        };
        const changeRecipe = (event) => {
            updateRecipe(event.target.id, event.target.value);
        };
        const changeIngredient = (event) => {
            // Id for textfields, name for selects
            const target = event.target;
            const id = target.id || target.name;
            const index = parseInt(id.replace(/-.*/, ''));
            const type = id.replace(/\d-/, '');
            let ingredient = {
                name: '',
                amount: undefined,
                unit: ''
            };
            const currentIngredient = recipe.ingredients[index];
            if (currentIngredient) {
                ingredient = Object.assign(Object.assign({}, ingredient), currentIngredient);
            }
            updateIngredient(Object.assign(Object.assign({}, ingredient), { [type]: type === 'amount' ? parseInt(String(target.value)) : target.value }), index);
        };
        const saveRecipe = () => {
            const recipeToSave = {
                name: recipe.name,
                ingredients: recipe.ingredients,
                steps: (recipe.method || '').split('\n'),
                method: recipe.method
            };
            (0, postData_1.default)('/save', {
                recipe: recipeToSave
            });
            afterSubmit && afterSubmit();
        };
        return (react_3.default.createElement(material_1.Box, { sx: { borderBottom: 1, borderColor: 'divider' } },
            react_3.default.createElement(material_1.Paper, null,
                react_3.default.createElement("form", null,
                    react_3.default.createElement(material_1.TextField, { style: { width: "200px", margin: "5px" }, type: "text", label: "Recipe Name", variant: "outlined", value: recipe.name, onInput: changeRecipe, id: 'name' }),
                    react_3.default.createElement(material_1.Divider, null),
                    react_3.default.createElement("h3", null, "Ingredients"),
                    react_3.default.createElement(material_1.TextField, { style: { width: "200px", margin: "5px" }, type: "number", label: "Number of Ingredients", variant: "outlined", InputProps: { inputProps: { min: 0 } }, value: recipe.ingredients.length, onInput: updateTotalIngredients }),
                    react_3.default.createElement("br", null),
                    (() => {
                        const result = [];
                        for (let i = 0; i < recipe.ingredients.length; i++) {
                            result.push(react_3.default.createElement("div", { key: i },
                                react_3.default.createElement("h4", null,
                                    "Ingredient ",
                                    i + 1),
                                react_3.default.createElement(material_1.TextField, { style: { width: "200px", margin: "5px" }, type: "text", label: "Ingredient Name", variant: "outlined", onInput: changeIngredient, id: `${i}-name`, value: recipe.ingredients[i].name }),
                                react_3.default.createElement("br", null),
                                react_3.default.createElement(material_1.TextField, { style: { width: "200px", margin: "5px" }, type: "number", label: "Ingredient Amount", variant: "outlined", onInput: changeIngredient, id: `${i}-amount`, value: recipe.ingredients[i].amount }),
                                react_3.default.createElement("br", null),
                                react_3.default.createElement(material_1.Select, { style: { width: "200px", margin: "5px" }, label: "Ingredient Unit", name: `${i}-unit`, value: recipe.ingredients[i].unit, onChange: changeIngredient },
                                    react_3.default.createElement(material_1.MenuItem, { value: 'grams' }, "grams"),
                                    react_3.default.createElement(material_1.MenuItem, { value: 'ml' }, "ml"),
                                    react_3.default.createElement(material_1.MenuItem, { value: 'tsp' }, "tsp")),
                                react_3.default.createElement("br", null)));
                        }
                        return result;
                    })(),
                    react_3.default.createElement(material_1.Divider, null),
                    react_3.default.createElement("h3", null, "Method"),
                    react_3.default.createElement(material_1.TextField, { style: { width: "200px", margin: "5px" }, type: "text", label: "Method", variant: "outlined", multiline: true, onInput: changeRecipe, id: 'method' }),
                    react_3.default.createElement("br", null),
                    react_3.default.createElement("br", null),
                    react_3.default.createElement(material_1.Button, { style: { margin: "5px" }, variant: "contained", color: "primary", onClick: saveRecipe }, "Save")))));
    };
    exports.default = RecipeForm;
});
define("react/helpers/getTarget", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = (event) => {
        let target = event.target;
        let count = 0;
        while (target.nodeName !== 'BUTTON' || count > 5) {
            target = target.parentNode;
            count++;
        }
        return target;
    };
});
define("react/RecipeList", ["require", "exports", "react", "@mui/material", "@mui/icons-material", "react/helpers/getData", "react/helpers/postData", "react/hooks/useValues", "react/RecipeForm", "react/helpers/getTarget"], function (require, exports, react_4, material_2, icons_material_1, getData_1, postData_2, useValues_1, RecipeForm_1, getTarget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    react_4 = __importStar(react_4);
    getData_1 = __importDefault(getData_1);
    postData_2 = __importDefault(postData_2);
    useValues_1 = __importDefault(useValues_1);
    RecipeForm_1 = __importDefault(RecipeForm_1);
    getTarget_1 = __importDefault(getTarget_1);
    ;
    const RecipeList = ({ recipes: defaultRecipes }) => {
        if (!defaultRecipes) {
            defaultRecipes = [];
        }
        const [recipes, setRecipes] = (0, react_4.useState)(defaultRecipes);
        const [search, updateSearch] = (0, useValues_1.default)({
            recipeName: '',
            ingredient: ''
        });
        const changeSearch = (event) => {
            const target = event.target;
            updateSearch(target.id, String(target.value));
        };
        const searchRecipes = () => __awaiter(void 0, void 0, void 0, function* () {
            const queryParts = [];
            if (search.recipeName) {
                queryParts.push(`recipe_name=${search.recipeName}`);
            }
            if (search.ingredient) {
                queryParts.push(`ingredient=${search.ingredient}`);
            }
            const query = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
            const response = yield (0, getData_1.default)(`/search${query}`);
            setRecipes(response.recipes);
        });
        const [showEditModal, setShowEditModal] = (0, react_4.useState)(false);
        const [selectedRecipe, setSelectedRecipe] = (0, react_4.useState)({
            name: '',
            ingredients: [],
            method: '',
            steps: []
        });
        const showEditRecipeModal = (event) => {
            const target = (0, getTarget_1.default)(event);
            setShowEditModal(true);
            const recipe = recipes.find(r => r.name === target.id);
            if (typeof recipe !== 'undefined') {
                setSelectedRecipe(recipe);
            }
        };
        const closeEditModal = () => {
            setShowEditModal(false);
        };
        const deleteRecipe = (event) => __awaiter(void 0, void 0, void 0, function* () {
            const target = (0, getTarget_1.default)(event);
            yield (0, postData_2.default)('/delete', {
                recipe_name: target.id
            });
        });
        return (react_4.default.createElement("div", null,
            react_4.default.createElement(material_2.Modal, { open: showEditModal, onClose: closeEditModal, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" },
                react_4.default.createElement(material_2.Box, null,
                    react_4.default.createElement(RecipeForm_1.default, Object.assign({}, { recipe: selectedRecipe, afterSubmit: closeEditModal })))),
            react_4.default.createElement(material_2.Paper, { sx: {
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                } },
                react_4.default.createElement(material_2.TextField, { style: { width: "200px", margin: "5px" }, type: "text", label: "Recipe Name", variant: "outlined", value: search.recipeName, onInput: changeSearch, id: 'recipeName' }),
                react_4.default.createElement(material_2.TextField, { style: { width: "200px", margin: "5px" }, type: "text", label: "Ingredient Name", variant: "outlined", value: search.ingredient, onInput: changeSearch, id: 'ingredient' }),
                react_4.default.createElement(material_2.Button, { style: { margin: "5px" }, variant: "contained", color: "primary", onClick: searchRecipes }, "Search")),
            react_4.default.createElement("br", null),
            react_4.default.createElement(material_2.Box, { sx: { borderBottom: 1, borderColor: 'divider' } },
                react_4.default.createElement(material_2.TableContainer, { component: material_2.Paper },
                    react_4.default.createElement(material_2.Table, { sx: { minWidth: 650 }, "aria-label": "simple table" },
                        react_4.default.createElement(material_2.TableHead, null,
                            react_4.default.createElement(material_2.TableRow, null,
                                react_4.default.createElement(material_2.TableCell, null, "Recipe"),
                                react_4.default.createElement(material_2.TableCell, null, "Ingredients"),
                                react_4.default.createElement(material_2.TableCell, null, "Method"))),
                        react_4.default.createElement(material_2.TableBody, null, recipes.map((recipe) => (react_4.default.createElement(material_2.TableRow, { key: recipe.name, sx: { '&:last-child td, &:last-child th': { border: 0 } } },
                            react_4.default.createElement(material_2.TableCell, { component: "th", scope: "row" }, recipe.name),
                            react_4.default.createElement(material_2.TableCell, null,
                                react_4.default.createElement(material_2.List, null, recipe.ingredients.map((ingredient) => (react_4.default.createElement(material_2.ListItem, { disablePadding: true, key: ingredient.name },
                                    react_4.default.createElement(material_2.ListItemText, { primary: `${ingredient.amount} ${ingredient.unit} ${ingredient.name}` })))))),
                            react_4.default.createElement(material_2.TableCell, null,
                                react_4.default.createElement(material_2.List, null, recipe.steps.map((step, index) => (react_4.default.createElement(material_2.ListItem, { disablePadding: true, key: step },
                                    react_4.default.createElement(material_2.ListItemText, { primary: `${(index + 1)}. ${step}` })))))),
                            react_4.default.createElement(material_2.TableCell, null,
                                react_4.default.createElement(material_2.Tooltip, { title: "Edit" },
                                    react_4.default.createElement(material_2.IconButton, { onClick: showEditRecipeModal, id: recipe.name },
                                        react_4.default.createElement(icons_material_1.Edit, null))),
                                react_4.default.createElement(material_2.Tooltip, { title: "Delete" },
                                    react_4.default.createElement(material_2.IconButton, { onClick: deleteRecipe, id: recipe.name },
                                        react_4.default.createElement(icons_material_1.Delete, null)))))))))))));
    };
    exports.default = RecipeList;
});
define("react/App", ["require", "exports", "react", "@mui/material/styles", "@mui/material", "react/RecipeList", "react/RecipeForm"], function (require, exports, react_5, styles_1, material_3, RecipeList_1, RecipeForm_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    react_5 = __importStar(react_5);
    RecipeList_1 = __importDefault(RecipeList_1);
    RecipeForm_2 = __importDefault(RecipeForm_2);
    ;
    const App = ({ recipes }) => {
        const [value, setValue] = (0, react_5.useState)(0);
        const handleChange = (event, newValue) => {
            setValue(newValue);
        };
        return (react_5.default.createElement(styles_1.StyledEngineProvider, null,
            react_5.default.createElement("h1", null, "Recipe App"),
            react_5.default.createElement(material_3.Box, { sx: { borderBottom: 1, borderColor: 'divider' } },
                react_5.default.createElement(material_3.Tabs, { value: value, onChange: handleChange },
                    react_5.default.createElement(material_3.Tab, { label: "Recipes" }),
                    react_5.default.createElement(material_3.Tab, { label: "Add Recipe" }))),
            (() => {
                switch (value) {
                    case 0:
                        return (react_5.default.createElement(RecipeList_1.default, { recipes: recipes }));
                    case 1:
                        return (react_5.default.createElement(RecipeForm_2.default, null));
                }
            })()));
    };
    exports.default = App;
});
define("types/DataSource", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
});
define("api/routes/index", ["require", "exports", "react-dom/server", "fs", "react", "mustache", "react/App"], function (require, exports, server_1, fs_1, react_6, mustache_1, App_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    fs_1 = __importDefault(fs_1);
    react_6 = __importDefault(react_6);
    mustache_1 = __importDefault(mustache_1);
    App_1 = __importDefault(App_1);
    exports.default = (dataSource) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const recipes = yield dataSource.getRecipes(null, null);
        const template = yield getFile();
        res.send(mustache_1.default.render(template, {
            html: (0, server_1.renderToString)(react_6.default.createElement(App_1.default, { recipes: recipes })),
        }));
    });
    const getFile = () => {
        return new Promise(res => {
            // TODO failing and returning undefined
            fs_1.default.readFile('../template.html', 'utf8', (err, data) => {
                console.log('data', data);
                res(data);
            });
        });
    };
});
define("api/routes/searchRecipes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = (dataSource) => (req, res) => {
        // Get parameters for the query, then use that to search for recipes
        const name = req.query.recipe_name;
        const ingredient = req.query.ingredient;
        const recipes = dataSource.getRecipes(name ? String(name) : null, ingredient ? String(ingredient) : null);
        res.json({
            recipes
        });
    };
});
define("api/routes/saveRecipe", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = (dataSource) => (req, res) => {
        dataSource.saveRecipe(req.body.recipe);
        res.end();
    };
});
define("api/routes/deleteRecipe", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = (dataSource) => (req, res) => {
        dataSource.deleteRecipe(req.body.recipe_name);
        res.end();
    };
});
define("api/datasources/Mongo", ["require", "exports", "mongoose"], function (require, exports, mongoose_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    mongoose_1 = __importDefault(mongoose_1);
    class MongoDataSource {
        constructor() {
            this.connectToDB();
        }
        connectToDB() {
            return __awaiter(this, void 0, void 0, function* () {
                const config = {
                    url: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
                    user: process.env.DB_USER,
                    pwd: process.env.DB_PASSWORD
                };
                try {
                    console.log('Connecting to DB', config);
                    yield mongoose_1.default.connect(config.url, {
                        user: config.user,
                        pass: config.pwd
                    });
                }
                catch (e) {
                    console.log(`Failed to connect to DB - ${e}`);
                }
            });
        }
        getRecipeModel() {
            const Schema = mongoose_1.default.Schema;
            const Ingredient = new Schema({
                name: String,
                amount: Number,
                unit: String
            });
            const Recipe = new Schema({
                name: String,
                ingredients: [Ingredient],
                steps: [String]
            });
            const RecipeModel = mongoose_1.default.model('Recipe', Recipe);
            return RecipeModel;
        }
        saveRecipe(recipe) {
            return __awaiter(this, void 0, void 0, function* () {
                const RecipeModel = this.getRecipeModel();
                const recipeToSave = new RecipeModel();
                recipeToSave.name = recipe.name;
                recipeToSave.ingredients = recipe.ingredients;
                recipeToSave.steps = recipe.steps;
                console.log('Saving recipe', recipe);
                yield recipeToSave.save();
                console.log('Recipe saved');
            });
        }
        deleteRecipe(name) {
            return __awaiter(this, void 0, void 0, function* () {
                const RecipeModel = this.getRecipeModel();
                console.log('Deleting recipe', name);
                yield RecipeModel.findByIdAndRemove(name);
                console.log('Recipe deleted');
            });
        }
        getRecipes(name, ingredient) {
            return __awaiter(this, void 0, void 0, function* () {
                const RecipeModel = this.getRecipeModel();
                console.log('Searching for recipes');
                const docs = yield RecipeModel.find({
                    name,
                    ingredient
                });
                return docs;
            });
        }
    }
    exports.default = MongoDataSource;
});
define("api/server", ["require", "exports", "express", "body-parser", "api/routes/index", "api/routes/searchRecipes", "api/routes/saveRecipe", "api/routes/deleteRecipe", "api/datasources/Mongo"], function (require, exports, express_1, body_parser_1, index_1, searchRecipes_1, saveRecipe_1, deleteRecipe_1, Mongo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    express_1 = __importDefault(express_1);
    body_parser_1 = __importDefault(body_parser_1);
    index_1 = __importDefault(index_1);
    searchRecipes_1 = __importDefault(searchRecipes_1);
    saveRecipe_1 = __importDefault(saveRecipe_1);
    deleteRecipe_1 = __importDefault(deleteRecipe_1);
    Mongo_1 = __importDefault(Mongo_1);
    const app = (0, express_1.default)();
    const port = 8081;
    app.use(body_parser_1.default.json({ limit: '10mb' }));
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        next();
    });
    // Setup routes
    const dataSource = new Mongo_1.default();
    app.get('/', (0, index_1.default)(dataSource));
    app.get('/search', (0, searchRecipes_1.default)(dataSource));
    app.post('/save', (0, saveRecipe_1.default)(dataSource));
    app.post('/delete', (0, deleteRecipe_1.default)(dataSource));
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
});
//# sourceMappingURL=api.js.map