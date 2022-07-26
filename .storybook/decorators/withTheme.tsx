import React, { JSXElementConstructor } from "react";
import { StoryContext } from '@storybook/react';

export default (Story: JSXElementConstructor<any>, context: StoryContext): JSX.Element => {
    // Load the theme CSS
    require(`../styles/${context.globals.theme}.css`);

    return (
        <div className="main">
            <Story/>
        </div>
    )
};