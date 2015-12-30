import Ember from 'ember';
import AuthValidations from '../mixins/auth-validations';

export default Ember.Component.extend(AuthValidations, {
  /** @type {Array} Bind the class to attributes */
  classNameBindings: [':set-width-and-center'],

  /** @type {Array} The different contact types that can be sent */
  contactTypes: ['Reaching Out', 'Bug Feedback', 'Feature Request'],

  /**
   * The selected contact type
   * @type {String}
   * @default 'Reaching Out'
   */
  selectedContactType: 'Reaching Out',

  /** @type {String} The name of the person submitting the form */
  nameValue: '',

  /** @type {String} The email from the contactor */
  emailValue: '',

  /** @type {String} The text of the request */
  commentValue: '',

  actions: {
    /**
     * Send the form to the contact api endpoint
     * On success, display the success message and redirect to the index
     * On failure, display the error message and trigger the submit failure action
     */
    formSubmit() {
      var self = this;

      Ember.$.ajax({
        type: 'POST',
        url: '/api/contact',
        data: {
          data: {
            type: 'contact',
            id: null,
            attributes: {
              contactType: self.get('selectedContactType'),
              name: self.get('nameValue'),
              fromEmail: self.get('emailValue'),
              content: self.get('commentValue')
            }
          }
        }
      })
      .done((data) => {
        Ember.get(self, 'flashMessages').success(data.meta.success);
        this.sendAction('submitSuccess', 'index');
      })
      .fail((xhr) => {
        var response = JSON.parse(xhr.responseText);
        Ember.get(self, 'flashMessages').danger(response.errors.error);
        this.sendAction('submitFailure');
      });
    }
  }
});
