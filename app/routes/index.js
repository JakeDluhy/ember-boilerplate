import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    /**
     * Persists the signup to the mailing list to the server
     * @param  {String} email - The email to sign up for the list
     */
    persistMailingListSignup(email) {
      let flashMessages = Ember.get(this, 'flashMessages');

      
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
        Ember.run(function() {
          flashMessages.success(data.meta.success);
        });
      })
      .fail((xhr) => {
        var response = JSON.parse(xhr.responseText);
        Ember.run(function() {
          flashMessages.danger(response.errors.error);
        });
      });
    }
  }
});
