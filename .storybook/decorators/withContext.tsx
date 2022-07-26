import { StoryContext } from '@storybook/react';
import React, { JSXElementConstructor } from 'react';
import StorybookProvider from '../../storybook/utils/StorybookProvider';

export default (Story: JSXElementConstructor<any>, context: StoryContext) => {
    const { globals } = context;
    const { theme } = globals;

    const props = {
        theme
    };

    return (
        <StorybookProvider {...props}>
            <Story/>
        </StorybookProvider>
    )
};