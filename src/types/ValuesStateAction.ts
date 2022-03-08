export default interface ValuesStateAction {
    type: string;
    property: string;
    value: string;
    defaultValues: Record<string, string | number>
};