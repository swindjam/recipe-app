
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe("Recipe tests", () => {

    it(`Given I have a new recipe
        When I add the new recipe name
        And ingredients
        And measurements
        And cooking method
        Then the new recipe is saved for later`, () => {
        cy.visit('/');

        // Navigate to the add recipe tab
        cy.get('button').contains('Add Recipe').click();

        // Enter the recipe details
        cy.get('input[id="name"]').type('Carrot Cake').trigger('change');
        cy.get('input[id="numberOfIngredients"]').type('{uparrow}');
        cy.get('input[id="numberOfIngredients"]').trigger('input');

        cy.get('input[id="0-name"]').focus().type('Flour').trigger('change');
        cy.get('input[id="0-amount"]').focus().type('200').trigger('change');
        cy.get('div[id="mui-component-select-0-unit"]').click();
        cy.get('li[data-value="grams').click();

        cy.get('input[id="1-name"]').type('Sugar').trigger('change');
        cy.get('input[id="1-amount"]').focus().type('100').trigger('change');
        cy.get('div[id="mui-component-select-1-unit"]').click();
        cy.get('li[data-value="grams').click();

        cy.get('textarea[id="method"]').type('Mix ingredients in a bowl\nCook in oven for 20 minutes at 180c');

        // Save the recipe
        cy.get('button').contains('Save').click();

        // Load the recipes page
        cy.get('button').contains('Recipes').click();
        cy.get('button').contains('Search').click();
        cy.contains('Carrot Cake');
        cy.contains('200 grams Flour');
        cy.contains('100 grams Sugar');
        cy.contains('1. Mix ingredients in a bowl');
        cy.contains('2. Cook in oven for 20 minutes at 180c');
    });

    it(`Given I want to look for a recipe
        When I search by the name of the recipe
        Then I find the recipe
        And I can see the ingredients
        And I can see the cooking methods`, () => {
        cy.visit('/');

        // Navigate to the add recipe tab
        cy.get('button').contains('Add Recipe').click();

        // Enter the recipe details
        cy.get('input[id="name"]').type('Chocolate Cake').trigger('change');
        cy.get('input[id="numberOfIngredients"]').type('{uparrow}');
        cy.get('input[id="numberOfIngredients"]').trigger('input');

        cy.get('input[id="0-name"]').type('Flour').trigger('change');
        cy.get('input[id="0-amount"]').type('200').trigger('change');
        cy.get('div[id="mui-component-select-0-unit"]').click();
        cy.get('li[data-value="grams').click();

        cy.get('input[id="1-name"]').type('Sugar').trigger('change');
        cy.get('input[id="1-amount"]').type('100').trigger('change');
        cy.get('div[id="mui-component-select-1-unit"]').click();
        cy.get('li[data-value="grams').click();

        cy.get('input[id="method"]').type('Mix ingredients in a bowl\nCook in oven for 20 minutes at 180c');

        // Save the recipe
        cy.get('button').contains('Save').click();

        // Load the recipes page
        cy.get('button').contains('Recipes').click();

        // Search for a non existent recipe
        cy.get('input[id="recipeName"]').type('Nothing');
        cy.contains('Chocolate Cake').should('not.exist');

        // Now search for the recipe we saved earlier
        cy.get('input[id="recipeName"]').type('Chocolate Cake');
        cy.contains('Search').click();
        cy.contains('Chocolate Cake');
        cy.contains('200 grams Flour');
        cy.contains('100 grams Sugar');
        cy.contains('1. Mix ingredients in a bowl');
        cy.contains('2. Cook in oven for 20 minutes at 180c');
    });

    it(`Given I want to look for a recipe by ingredients
        When I search by the ingredient of the recipe
        Then I find the recipe
        And I can see the ingredients
        And I can see the cooking methods`, () => {
        cy.visit('/');

        // Navigate to the add recipe tab
        cy.get('button').contains('Add Recipe').click();

        // Enter the recipe details
        cy.get('input[id="name"]').type('Banana Bread').trigger('change');
        cy.get('input[id="numberOfIngredients"]').type('{uparrow}');
        cy.get('input[id="numberOfIngredients"]').trigger('input');

        cy.get('input[id="0-name"]').type('Flour').trigger('change');
        cy.get('input[id="0-amount"]').type('200').trigger('change');
        cy.get('div[id="mui-component-select-0-unit"]').click();
        cy.get('li[data-value="grams').click();

        cy.get('input[id="1-name"]').type('Sugar').trigger('change');
        cy.get('input[id="1-amount"]').type('100').trigger('change');
        cy.get('div[id="mui-component-select-1-unit"]').click();
        cy.get('li[data-value="grams').click();

        cy.get('input[id="method"]').type('Mix ingredients in a bowl\nCook in oven for 20 minutes at 180c');

        // Save the recipe
        cy.get('button').contains('Save').click();

        // Load the recipes page
        cy.get('button').contains('Recipes').click();

        // Search for a non existent recipe
        cy.get('input[id="ingredient"]').type('Nothing');
        cy.contains('Banana Bread').should('not.exist');

        // Now search for the recipe we saved earlier
        cy.get('input[id="ingredient"]').type('Banana Bread');
        cy.get('button').contains('Search').click();
        cy.contains('Banana Bread');
        cy.contains('200 grams Flour');
        cy.contains('100 grams Sugar');
        cy.contains('1. Mix ingredients in a bowl');
        cy.contains('2. Cook in oven for 20 minutes at 180c');
    });
});