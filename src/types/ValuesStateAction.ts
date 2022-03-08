export interface ValuesStateAction {
    type: string;
    property?: string;
    value?: string | number;
    defaultValues?: Record<string, string | number>
};