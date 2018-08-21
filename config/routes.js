/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/*': {
    controller: 'HomeController',
    action: 'home',
    skipAssets: true,
    skipRegex: /^\/api\/.*$/
  },
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
  /*
  * Auth Api
  * */
  'get /api/auth/login' : 'AuthController.login',
  'get /api/auth/logout' : 'AuthController.logout',
  'get /api/auth/authenticate' : 'AuthController.authenticate',
  'get /api/auth/authcallback' : 'AuthController.authcallback',
  'get /api/auth/verify' : 'AuthController.verify',
  'get /api/auth/welcome' : 'AuthController.welcome',


  /*
  * User Api
  * */
  'get /api/users/me' : 'UserController.me',
  'get /api/users': 'UserController.index',
  'get /api/users/:id' : 'UserController.show',
  /*
  * Post Api
  * */
  'post /api/posts' : 'PostsController.create',
  'get /api/posts' : 'PostsController.index',
  'get /api/posts/:id' : 'PostsController.show',
  'put /api/posts/:id' : 'PostsController.update',
  'delete /api/posts/:id' : 'PostsController.delete',
  'get /api/users/:idUser/posts' : 'PostsController.index',
  'get /api/users/:idUser/posts/:id' : 'PostsController.show',
  'get /api/users/favorites' : 'PostsController.favorites',
  /*
   * Image Api
   * */
  'post /api/images' : 'ImagesController.upload',
  /*
  * Tag Api
  * */
  'get /api/tags' : 'TagsController.index',
  /*
  * Favorite Api
  * */
  'post /api/favorites' : 'FavoritesController.create',
  'delete /api/favorites/:id': 'FavoritesController.delete',
  /*
  **
  *  API
   */
};
