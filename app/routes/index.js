import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    /**
     * Persists the signup to the mailing list to the server
     * @param  {String} email - The email to sign up for the list
     */
    persistMailingListSignup(email) {
      let self = this;
      
      Ember.$.ajax({
        type: 'POST',
        url: '/api/mailing_list',
        data: {
          data: {
            type: 'user',
            id: null,
            attributes: {
              email: email
            }
          }
        }
      })
      .done((data) => {
        Ember.get(self, 'flashMessages').success(data.meta.success);
      })
      .fail((xhr) => {
        var response = JSON.parse(xhr.responseText);
        Ember.get(self, 'flashMessages').danger(response.errors.error);
      });
    }
  }
});
