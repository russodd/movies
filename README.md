# The Movie Database UI and Backend Shell

This project is a simple frontend user interface and backend wrapper to display movie information retrieved from [The Movie Database API](https://www.themoviedb.org/settings/api).

## Setup

The React client for this app can be found in the `client` folder, and the Node.js backend (an Express application) can be found in the `api` folder.  I used node `v12.16.0` to make this project, as specified in my `.nvmrc` files, so if you're having issues with your default node you can use [nvm](https://github.com/nvm-sh/nvm) to try switching over to it. Both directories need to have their node modules installed before they can run, which you can do by running `npm install` in each of them.

The API portion of the code also expects a `config.json` file to exist inside the `api` folder.  The contents of that file should look like this:

```
{
    "api_key": [API KEY OBTAINED FROM THEMOVIEDB.ORG]
}
```

## Running Instructions

The client runs on port 3000 by default, and the backend runs on port 9000.  Each can be started by running `npm start` in the `client` and `api` directories, respectively.

## The Code

The React client code lives in `client/src`, and contains three main component files: [App.js](client/src/App.js) (the main component), [MovieList.js](client/src/MovieList.js), and [MovieDetail.js](client/src/MovieDetail.js), which all share CSS styles from [App.css](client/src/App.css).

The code for the backend endpoints can all be found in the `api/routes` folder, in a file called [movies.js](api/routes/movies.js).  I also had to make some minor modifications to [app.js](api/app.js) in order to set up the `movies` route.

## User Interface

The UI is mostly (hopefully) self-explanatory, but I'll point out a few things here anyways. Popular movies are displayed by default. There's a search bar right under the page header (next to a "Home" button that lets you go back to seeing popular movies at any time). Clicking on a movie title or poster in the Popular Movies or search results list will take you to a page that has details for that movie.  Enjoy!