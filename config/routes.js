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

  '/': {
    view: 'homepage'
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
  'get /auth/login' : 'AuthController.login',
  'get /auth/logout' : 'AuthController.logout',
  'get /auth/authenticate' : 'AuthController.authenticate',
  'get /auth/authcallback' : 'AuthController.authcallback',
  'get /auth/verify' : 'AuthController.verify',
  'get /auth/welcome' : 'AuthController.welcome',


  /*
  * User Api
  * */
  'get /users/me' : 'UserController.me',
  'get /users': 'UserController.index',
  'get /users/:id' : 'UserController.show',
  /*
  * Post Api
  * */
  'post /posts' : 'PostsController.create',
  'get /posts' : 'PostsController.index',
  'get /posts/:id' : 'PostsController.show',
  'put /posts/:id' : 'PostsController.update',
  'delete /posts/:id' : 'PostsController.delete',
  'get /users/:idUser/posts' : 'PostsController.index',
  'get /users/:idUser/posts/:id' : 'PostsController.show',
  'get /users/favorites' : 'PostsController.favorites',
  /*
   * Image Api
   * */
  'post /images' : 'ImagesController.upload',
  /*
  * Tag Api
  * */
  'get /tags' : 'TagsController.index',
  /*
  * Favorite Api
  * */
  'post /favorites' : 'FavoritesController.create',
  'delete /favorites/:id': 'FavoritesController.delete',
  /*
  **
  *  API
   */
};
