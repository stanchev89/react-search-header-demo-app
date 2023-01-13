# react-search-header-demo-app
The purpose of this project is to demonstrate the usage of url query parameters
along with internal component state to manage reactive API requests on any 
input change (with debounce when typing).
Key parts of this functionality:
* SearchHeader component
* useDebounceCallback hook
* useQueryParamState hook
* useQuery (@tanstack React Query)

Another topic is how could we optimise long data list rendering with our ViewportListRender 
custom component.

## Technologies used:
* React
* TypeScript
* Material UI
* React Query
* JSONPlaceholder API (https://jsonplaceholder.typicode.com/) as a server.

## Setup

### `npm install` / `yarn install`
Install all dependencies.

### `npm start` / `yarn start`
Run the app in the development mode.

### `npm test` / `yarn test`
Launches the test runner in the interactive watch mode.

