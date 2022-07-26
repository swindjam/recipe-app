import React, { useContext } from 'react';
import RecipeList, { Props as RecipeListProps } from '../../src/react/RecipeList';
import { Context } from './StorybookProvider';

export default () => (args: RecipeListProps) => {
    const context = useContext(Context);
    
    return (
        <RecipeList {...{
            ...context,
            ...args,
        }}/>
    );
};