import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

const { RSVP, isEmpty, run } = Ember;

export default Base.extend({
  /** @type {Service} Inject the current user into the authenticator */
  currentUser: Ember.inject.service('current-user'),

  /**
   * Restore the session from the data in local storage
   * @param  {object} data - the data from local or session storage
   * @return {Promise} Resolves to {object} data - the data passed through
   *                   Rejects to null
   */
  restore(data) {
    return new RSVP.Promise((resolve, reject) => {
      if(isEmpty(data['token'])) {
        reject();
      } else {
        resolve(data);
      }
    });
  },

  /**
   * Authenticate by logging in. Send an ajax request to the login endpoint.
   * If it is successful, resolve the promise with the remember me parameter,
   * otherwise, reject with the JSON error response
   * @param  {object} options - an object containing email and password keys and optionally a rememberMe key
   * @return {Promise} Resolves to the response data of user attributes merged with the rememberMe option
   *                   Rejects to the response data
   */
  authenticate(options) {
    let self = this;

    return new RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        type: 'POST',
        url: '/api/login',
        data: {
          email: options['email'],
          password: options['password']
        }
      })
      .done((response) => {
        run(function() {
          self.get('currentUser').setProperties(response.meta.user);
          self.get('currentUser').setupAjaxHeaders(response.meta.token);
        });
        run(null, resolve, Ember.merge(response.meta, {rememberMe: options.rememberMe}));
      })
      .fail((xhr) => {
        run(null, reject, JSON.parse(xhr.responseText));
      });
    });
  },
  
  /**
   * Invalidate the current session
   * @param  {object} data - the data from local storage
   * @return {Promise} Resolves always
   */
  invalidate(data) {
    return new RSVP.Promise((resolve) => {
      resolve();
    });
  }
});