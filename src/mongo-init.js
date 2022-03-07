db.auth('root', 'example');

db.createUser(
    {
        user: 'chef',
        pwd: 'pizza',
        roles: [
            {
                role: 'root',
                db: 'recipe_db'
            }
        ]
    }
);