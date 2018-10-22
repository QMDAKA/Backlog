/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/


  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/
  frontendHost: 'http://www.dakth.info',
  dbHostname: 'mongo',
  // frontendHost: 'http://localhost',
  port: 80,
  connections : {
    mongoLive: {
      adapter: 'sails-mongo',
      host: 'mongo',
      port: 27017,
      user: 'daka',
      password: 'daka',
      database: 'backlog'
    }
  },
  models: {
    connection: 'mongoLive'
  }
  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  // log: {
  //   level: "silent"
  // }

};
