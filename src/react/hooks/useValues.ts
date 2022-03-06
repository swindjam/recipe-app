import { useReducer } from 'react';
import objectReducer from './objectReducer';

export default function useValues(defaultValues: Record<string, string>) {
    const [values, updateValues] = useReducer(objectReducer, defaultValues);

    return [
        values,
        (property: string, value: string) => {
            updateValues({
                type: 'update',
                property,
                value
            });
        }
    ];
}