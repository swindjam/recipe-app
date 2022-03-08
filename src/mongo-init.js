/* eslint-disable */
// ESLint disabled as this runs directly in Mongo
db.auth('root', 'example');

db.createUser(
    {
        user: 'chef',
        pwd: 'pizza',
        roles: [
            {
                role: 'readWrite',
                db: 'recipe_db'
            }
        ]
    }
);