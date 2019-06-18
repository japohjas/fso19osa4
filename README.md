npm ini

package.json
...
"scripts": {
    "start": "node index.js",
...

npm install express --save

npm install --save-dev nodemon
...
 "scripts": {
    "start": "node index.js",
    "watch": "nodemon index.js",
...
käynnistys: npm run watch

npm install cors --save

npm install mongoose --save

npm install dotenv --save
salasana:
.env   MONGODB_URI=...
käyttöönotto:
require('dotenv').config()
Tiedosto .env tulee laittaa heti tiedostoon .gitignore

npm install --save-dev jest
jest.config.js
"scripts":
  "test": "jest --verbose"
npm run test

npm install eslint --save-dev
node_modules/.bin/eslint --init (osa3)
npm run lint

npm install --save-dev supertest

salasanojen hashaamiseen bcrypt-kirjasto:
npm install bcrypt --save

Uniikkiuden tarkastaminen Mongoosen validoinnin avulla
npm install --save mongoose-unique-validator

Muistiinpanon luominen

Token-perustainen kirjautuminen

npm install jsonwebtoken --save
