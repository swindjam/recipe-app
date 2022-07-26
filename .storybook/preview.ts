import withTheme from './decorators/withTheme';

export const parameters = {
    actions: {
        argTypesRegex: '^on[A-Z].*'
    }
};

export const globalTypes = {
    theme: {
        name: 'Theme',
        description: 'Theme',
        defaultValue: 'light',
        toolbar: {
            items: [
                {
                    value: 'light',
                    title: 'Light'
                },
                {
                    value: 'dark',
                    title: 'Dark'
                }
            ],
            showName: true,
        }
    }
}

export const decorators = [withTheme];