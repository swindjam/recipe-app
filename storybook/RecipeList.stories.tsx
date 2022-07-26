import { Story } from '@storybook/react';
import getTemplate from './utils/getTemplate';
import withContext from '../.storybook/decorators/withContext';
import { Props as RecipeListProps } from '../src/react/RecipeList';

export default {
    title: 'Recipe List',
    component: null,
    decorators: [
        withContext
    ]
};

const Template = getTemplate();

export const NoRecipes: Story<RecipeListProps> = Template.bind({});
NoRecipes.args = {
    recipes: [],
};

export const CustomRecipes: Story<RecipeListProps> = Template.bind({});
CustomRecipes.args = {
    recipes: [
        {
            id: '1',
            name: 'Cake',
            ingredients: [
                {
                    name: 'Flour',
                    amount: 200,
                    unit: 'g',
                }
            ],
            method: 'Mix things together',
            steps: [
                'Put flour in bowl',
                'Mix mix mix'
            ],
        }
    ],
};