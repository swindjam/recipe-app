import React from 'react';

export const Context = React.createContext({});
export const { Provider, Consumer } = Context;

const StorybookProvider = (props: Record<any, any>) => {
    const { children } = props;
    return (
        <Provider {...{value: props,}}>
            {children}
        </Provider>
    );
};

export default StorybookProvider;