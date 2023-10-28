`ATM demo` is a web app that shows a simple ATM. Main features:
1. User can see account info.
2. User can withdraw money.
3. ATM understands denominations and can pay out accordingly.

Tech stack:
1. Node.js + Express for api
2. Postgres to store data
3. Frontend is in React

## Local testing
Prerequisites:
1. Make sure you have a Postgres instance running.
2. Node 8.x
3. Yarn

Setup:
1. Clone the repo into a directory.
2. Copy `.env.example` to `.env`.
3. Modify `DATABASE_URL` in the `.env` to point to your Postgres instance.
4. Run `yarn` to install dependencies.
5. Run `yarn test` to see if tests pass.
6. Run `yarn migrate` to create DB tables.
7. Run `yarn demo:data` to insert some users and accounts.
8. Run `yarn develop` to start webpack dev server for frontend and node for api.

App should now be available on `http://localhost:3000`.

## Live demo
Heroku

maroko
