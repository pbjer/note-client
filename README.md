# note-client

This is the frontend client of a note-taking application with the following features:

- Oauth signin with Google

- Create, read, update, and delete your notes

- Sort by most recent, or oldest first

- View all of your notes at once, or view them by page (available via settings once logged in)

- View when your note was created, as well as the last time you updated it

## Install dependencies
`yarn install`

## Start the development server
`yarn start` will start the client at `http://localhost:3000`
By default, requests are configured to hit a development server running on `http://localhost:3030`, which can be configured via the .env file.

## Build for production
`yarn build`
