import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  /**
   * Specify the namespace for requests
   * @type {String}
   */
  namespace: '/api',

  /**
   * Finds the jwtKey in local or session storage and sets it to the auth headers
   * @return {object} the custom headers 
   */
  headers: Ember.computed('session.authenticated.token', function() {
    let jwtKey = localStorage.getItem('jwtKey') || sessionStorage.getItem('jwtKey') || '';

    return {
      'AUTHORIZATION': `Bearer ${jwtKey}`
    };
  })
});
