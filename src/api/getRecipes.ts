export default () => {
    const recipes = [
        {
            name: 'Cake',
            ingredients: [
                {
                    name: 'flour',
                    amount: 400,
                    unit: 'grams'
                },
                {
                    name: 'sugar',
                    amount: 200,
                    unit: 'grams'
                }
            ],
            steps: [
                'Mix in bowl',
                'Put in oven',
                'Cook for 20mins at 180c'
            ]
        }
    ];
    return recipes;
};