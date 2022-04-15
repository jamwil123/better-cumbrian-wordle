# Getting Started with React/TypeScript/GitHub Pages

React is a front-end JavaScript library. This repository is an example of a
starter project, as generated by the
[Create React App](https://github.com/facebook/create-react-app) command,
using the TypeScript template. It is configured to deploy to GitHub pages
at:

> [https://jlumbroso.github.io/wordle-react-clone/](https://jlumbroso.github.io/wordle-react-clone/)

on any push/pull request to this repository.

## Setting this up from scratch

Node.js is a standalone runtime for JavaScript that is used both to run
JavaScript code on servers, but also it is frequently used by JavaScript
developers to run utility scripts locally. In this case, Node.js is used
as the runtime for certain build processes---but it is not needed once the
front-end has been built (and is ready to be deployed as is to GitHub Pages).

On some development environment:

- Install Node.js with a package manager (we assume `npm`).

- Verify Node.js and the package manager are installed properly by
  checking that the executables can be found and looking up their version
  number:

  ```
  $ node -v
  v16.14.2

  $ npm -v
  8.5.0
  ```

- Install the **Create React App** command:

  ```
  $ npm install react-scripts@latest
  ```

- Create a React project skeleton, then go to the project's folder:

  ```
  $ create-react-app <PROJECT NAME> --template typescript
  [... OUTPUT REMOVED ...]

  $ cd <PROJECT NAME>
  ```

  If the `create-react-app` command cannot be found, you might have
  to invoke that script using `npx` (the companion command to `npm`
  intended to invoke standalone scripts).

- Install the `gh-pages` package:

  ```
  npm install gh-pages --save-dev
  ```

- In the `package.json` file, you must add two things:

  1. You must add the URL at which the project will be hosted.
     You can add a key/value pair after the name of the project:

     ```
         ...
         "homepage": "https://jlumbroso.github.io/wordle-react-clone",
         ...
     ```

     If you are using GitHub Pages, this URL would probably be something
     along the lines of `https://<USERNAME>.github.io/<PROJECT NAME>`).

  2. In the `"scripts"` dictionary, you must add two entries to
     `"predeploy"` and `"deploy"`:

     ```
         ...
         "scripts": {
             "predeploy": "npm run build",
             "deploy": "gh-pages -d build",
             ...
         }
         ...
     ```

- By default, the `create-react-app` command creates a local Git
  repository. You must connect this repository to a GitHub repository.
  First [create a GitHub repository](https://github.com/new).
  Then link your local repository with the one you just created:

  ```
  $ git remote add origin https://github.com/{USERNAME}/{PROJECT NAME}
  ```

  Finally, although optional, it is best that you then commit the
  entire codebase to GitHub:

  ```
  $ git add .
  $ git commit -m "Configure React app for deployment to GitHub Pages"
  $ git push origin master
  ```

- Finally, you can now locally deploy by either committing to the
  repository (in which case, compilation will be done by GitHub
  Actions), or locally by running the command:
  ```
  $ npm run deploy -- -m "Deploy React app to GitHub Pages"
  ```

## Local development

If you are cloning this repository locally, you must first install all
packages before you can use the local environment:

```
$ git clone https://github.com/jlumbroso/wordle-react-clone
$ npm install
```

Then, these are the commands provided for local development:

- `npm start` runs the app locally in development mode.
- `npm test` runs the test runner in interactive watch mode, see
  docs about [running tests](https://facebook.github.io/create-react-app/docs/running-tests)
- `npm run build` builds the app for production in the `./build` folder.
- `npm run eject` allows for advanced configuration, see
  [here](https://create-react-app.dev/docs/available-scripts#npm-run-eject).
- `npm run deploy` deploys the project to GitHub Pages (assuming it builds and passes tests).

## References

- https://github.com/facebook/create-react-app
- https://create-react-app.dev/docs/getting-started
- https://github.com/gitname/react-gh-pages
- https://dev.to/achukka/deploy-react-app-using-github-actions-157d
