# File Structure
## Design Pattern
This is loosely based on the Express application generator framework.

## Layout

+ `node_modules/` – contains libraries used by node.js
+ `public/` – contains all static files like images, styles and javascript
- `images/` - contains static images, e.g. background
- `javascripts/` - contains all front end javascript
- `stylesheets/` - contains all CSS files
+ `routes/` – defines your app routes and their logic, i.e. backend javascript etc.
+ `views/` – provides templates which are rendered and served by your routes, i.e. HTML files
+ `server.js` – initializes the app and glues everything together
+ `package.json` – remembers all packages that your app depends on and their versions