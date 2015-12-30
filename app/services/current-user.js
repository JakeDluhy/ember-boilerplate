import Ember from 'ember';

const { on, computed } = Ember;

/**
 * The problem with ember-simple-auth's session store method is that it doesn't offer a reliable way to maintain user consitency between
 * the server and client. Because it's localStorage string is read only
 * (which, btw, is DUMB because I can go in and change it manually - making it read only offers 0 additional security)
 * you can't update the current user stored in it on a user update. Not to mention, as I noted above, that I can go in and change any
 * of the current user properties that I want, which seems to me a huge security hole, and renders it pretty useless
 *
 * Instead, this requests the current user object on app start, and maintains consistency throughout updates by updating the properties
 * when they change
 */
export default Ember.Service.extend({
  /** Get the jwt key from storage */
  getJwtKey() {
    return localStorage.getItem('jwtKey') || sessionStorage.getItem('jwtKey');
  },

  /** Set the jwt key to storage */
  setJwtKey(jwtToken) {
    if(localStorage.getItem('jwtKey')) {
      localStorage.setItem('jwtKey', jwtToken);
    } else {
      sessionStorage.setItem('jwtKey', jwtToken);
    }
  },

  /**
   * On init, we want to get the jwtKey, and authenticate against the server
   * It should return data for the current user, which get set as properties
   * This is to maintain consistency between the server and client
   */
  init: function() {
    let self = this;
    let jwtKey = this.getJwtKey();

    Ember.$.ajax({
      type: 'GET',
      url: '/api/users/current_user',
      headers: {
        'AUTHORIZATION': `Bearer ${jwtKey}`
      }
    })
    .done((response) => {
      console.log(response);
      self.setProperties(response.data.attributes);
    })
    .fail((xhr) => {
      console.log(xhr);
    });
  },

  /**
   * Update the user attributes through a custom ajax request
   * On success, we set the properties to the new attribute hash, maintaining consistency
   * and set the new jwtKey
   * @param {object} attributeHash - An object containing the attributes of the user to update
   */
  updateUserAttributes(attributeHash) {
    let self = this;
    let jwtKey = this.getJwtKey();

    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        type: 'PUT',
        url: `/api/users/${self.get('id')}`,
        headers: {
          'AUTHORIZATION': `Bearer ${jwtKey}`
        },
        data: {
          data: {
            type: 'user',
            id: self.get('id'),
            attributes: attributeHash
          }
        }
      })
      .done((data) => {
        self.setProperties(attributeHash);
        self.setJwtKey(data.meta.token);
        resolve();
      })
      .fail((xhr) => {
        reject(JSON.parse(xhr.responseText));
      });
    });
  },

  /**
   * Update the user password. On success set the new jwt key
   * @param  {Object} attributeHash - The object containing the password to update
   */
  updateUserPassword(attributeHash) {
    let self = this;
    let jwtKey = this.getJwtKey();

    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        type: 'PUT',
        url: `/api/users/${self.get('id')}/change_password`,
        headers: {
          'AUTHORIZATION': `Bearer ${jwtKey}`
        },
        data: {
          data: {
            type: 'user',
            id: self.get('id'),
            attributes: attributeHash
          }
        }
      })
      .done((data) => {
        self.setJwtKey(data.meta.token);
        resolve();
      })
      .fail((xhr) => {
        reject(JSON.parse(xhr.responseText));
      })
    });
  }
});
