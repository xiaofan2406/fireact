# Fireact
[![Build Status][build-badge]][build] [![Dependencies Status][dependencies-badge]][dependencies]

[build-badge]: https://img.shields.io/travis/xiaofan2406/fireact.svg?style=flat-square
[build]: https://travis-ci.org/xiaofan2406/fireact
[dependencies-badge]: https://img.shields.io/david/xiaofan2406/fireact.svg?style=flat-square
[dependencies]: https://david-dm.org/xiaofan2406/fireact
> React with Firebase


## Get Started
- Install dependencies
  ```
  yarn
  ```

- Run dev server
  ```
  yarn dev
  ```

- Build for production
  ```
  yarn build
  ```

- Test production build
  ```
  yarn prod
  ```


## Details

#### Mobx
  - [Read Docs](http://mobxjs.github.io/mobx/index.html)
  - `mobx-react-devtools` included

#### [JSS](https://github.com/cssinjs/jss)
  - [Read this](https://github.com/oliviertassinari/a-journey-toward-better-style)
  - Using together with [`react-jss`](https://github.com/cssinjs/react-jss)
  - Using [classnames](https://github.com/JedWatson/classnames) helper to make conditional class names cleaner

#### CSS
  - Using [`ExtractTextPlugin`](https://github.com/webpack/extract-text-webpack-plugin) to combine all css into one file in production
  - No PostCSS, SASS or CSS Module setup
  - Includes a Semantic UI [`reset.css`](https://github.com/Semantic-Org/Semantic-UI/blob/master/dist/components/reset.css)

#### [React Router v4](https://reacttraining.com/react-router)


## Development

#### Hot Module Replacement
  - using [`react-hot-loader`](https://github.com/gaearon/react-hot-loader/tree/next)
  - JSS, CSS and components are hot reloading

#### ESLint
  - based on [Airbnb React Style Guide](https://github.com/airbnb/javascript/tree/master/react)


## Folders
Path | Import alias | Description
--- | --- | ---
**config/** |  | Project tooling configuration files
**src/** | `src` | App source files directory, processed by webpack
src/**components/** | `components` | React components folder
src/**hocs/** | `hocs` | Higher-order components folder
src/**router/** |  | React Router setup and route-level components folder
src/**store/** |  | Mobx store folder
src/**styles/** | `styles` | Global CSS and JSS folder
src/**utils/** | `utils` | JavaScript helper functions folder
src/**widgets/** | `widgets` | Small shared React components folder
