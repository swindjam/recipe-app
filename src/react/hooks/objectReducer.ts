import ValuesStateAction from "../../types/ValuesStateAction";

export default (state: Record<string,string>, action: ValuesStateAction): Record<string,string> => {
    const { type, property, value} = action;

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
            return state;
        default:
            return state;
    }
}