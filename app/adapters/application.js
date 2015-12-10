import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: '/api',

  // Retrieve the jwtKey from localStorage, or sessionStorage and set it as the Auth header
  headers: Ember.computed('session.authenticated.token', function() {
    let jwtKey = localStorage.getItem('jwtKey') || sessionStorage.getItem('jwtKey') || '';

    return {
      'AUTHORIZATION': `Bearer ${jwtKey}`
    };
  })
});
