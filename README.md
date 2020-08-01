# Backend Developer Challenge

A backend developer interview challenge for rental APIs.

## Design
#### Security
Jsonwebtokens are specifically provided as json and not cookies to mitigate against CSRF attacks. If you properly secure against CSRF then you don't need to worry about it, but it's safer to just avoid credentials in cookies.

The secret for JWTs is stored in package.json, under `variables`.

#### Code
The code is laid out to mimic the request path (uri) as closely as possible. When you need to find out why a specific route is not functioning correctly, you can just follow the request path to end up at the code.

#### Tests
Tests are designed to be parallelized and isolated (one test does not in anyway interact with the others, especially since data is not written to the database files).

### Goals
- Basic auth to get JWT bearer token
- JSON backed database
- Provide simple information about rental listings
- Use ES6+ and module dependencies (.mjs)
- Minimal testing
- Use async/await when possible/necessary

### Non Goals (but would be nice)
- Style linting
- JSdoc documentation
- OpenAPI documentation (would have been really nice to have self documenting code)
- A real database
- Webpack
  - This would have allowed us to do some cool things and save time, like automatic path traversal and global package import paths.
- Better logging, both machine logging (json) and human readable
- Multiple resolution images for responsive imgSets
- User identity validation, such as email and phone number
- Sanitized 500 error messages (preferably with a error tracking ID) & Sentry
- Permissioned JWTs
- Use more assurances from JWT spec (expires, audience, etc...)
- Schema validation for new rentals/changes using [yup](https://www.npmjs.com/package/yup)
- Rental query filtering/limiting
- Git hooks for testing scripts, commit language, linting, etc..

## Installation

Use the package manager [yarn](https://yarnpkg.com/) or npm to install backend-developer-challenge.

```bash
yarn install
```

## Usage

```bash
yarn start
```

## Testing

```bash
yarn test
```

## Development
See documentation in `data/README.md` and `lib/api/v1/README.md` as well.

You can load http-archive.har (located in the root directory) into your preferred API testing application for interactive testing.

## License
[MIT](https://choosealicense.com/licenses/mit/)

### Timing
1705 - 2140 Architecture design, data design, coding, testing
1415 - 1610 Implement endpoints and tests
2000 - 2030 Documentation for API

Total time: 7 Hours
