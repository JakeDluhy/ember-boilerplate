import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

const { RSVP, isEmpty, run } = Ember;

export default Base.extend({
  // Restore the session: if the token is stored in the session store, resolve
  restore(data) {
    return new RSVP.Promise((resolve, reject) => {
      if(isEmpty(data['token'])) {
        reject();
      } else {
        resolve(data);
      }
    });
  },
  /*
   Authenticate by logging in. Send an ajax request to the login endpoint.
   If it is successful, resolve the promise with the remember me parameter,
   otherwise, reject with the JSON error response
   */
  authenticate(options) {
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
        run(null, resolve, Ember.merge(response, {rememberMe: options['rememberMe']}));
      })
      .fail((xhr) => {
        run(null, reject, JSON.parse(xhr.responseText));
      });
    });
  },
  // Invalidate the session
  invalidate(data) {
    return new RSVP.Promise((resolve) => {
      resolve();
    });
  }
})