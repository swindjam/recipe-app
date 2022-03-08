import objectReducer from '../objectReducer';

describe('objectReducer.ts', () => {

    test('Should update a value in state', () => {
        const state = {
            a: 1,
            b: 2
        };
        const action = {
            type: 'update',
            property: 'b',
            value: 3
        }
        expect(objectReducer(state, action)).toMatchObject({
            a: 1,
            b: 3
        })
    });

    test('Should reset the values in state', () => {
        const state = {
            a: 1,
            b: 2
        };
        const action = {
            type: 'update',
            property: 'b',
            value: 3
        }
        expect(objectReducer(state, action)).toMatchObject({
            a: 1,
            b: 3
        })
    });
});