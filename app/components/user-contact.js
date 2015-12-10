import Ember from 'ember';
import AuthValidations from '../mixins/auth-validations';

export default Ember.Component.extend(AuthValidations, {
  classNameBindings: [':set-width-and-center'],

  // Default form values
  contactTypes: ['Reaching Out', 'Bug Feedback', 'Feature Request'],
  selectedContactType: 'Reaching Out',
  nameValue: '',
  emailValue: '',
  commentValue: '',

  actions: {
    // Submit the contact form
    formSubmit() {
      var self = this;

      Ember.$.ajax({
        type: 'POST',
        url: '/api/contact',
        data: {
          contact: {
            contactType: self.get('selectedContactType'),
            name: self.get('nameValue'),
            email: self.get('emailValue'),
            content: self.get('commentValue')
          }
        }
      })
      .done((data) => {
        Ember.get(self, 'flashMessages').success(data.success);
        this.sendAction('submitSuccess', 'index');
      })
      .fail((xhr) => {
        var response = JSON.parse(xhr.responseText);
        Ember.get(self, 'flashMessages').success(response.error);
        this.sendAction('submitFailure');
      });
    }
  }
});
