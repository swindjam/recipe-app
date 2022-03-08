import ValuesStateAction from "../../types/ValuesStateAction";

export default (state: Record<string, string>, action: ValuesStateAction): Record<string, string | number> => {
    const { type, property, value, defaultValues } = action;

    switch (type) {
        case 'update':
            if (property) {
                return {
                    ...state,
                    [property]: value
                };
            }
            return state;
        case 'reset':
            return defaultValues;
        default:
            return state;
    }
}