import Ember from 'ember';
import AuthValidations from '../mixins/auth-validations';

export default Ember.Component.extend(AuthValidations, {
  /** @type {String} The tag element */
  tagName: 'div',

  /** @type {Array} Bind the class to attributes */
  classNameBindings: [':user-auth-wrapper', ':set-width-and-center'],

  /** @type {String} The value of the first name form input */
  firstNameValue: '',

  /** @type {String} The value of the last name form input */
  lastNameValue: '',

  /** @type {String} The value of the email form input */
  emailValue: '',

  /** @type {String} The value of the password form input */
  passwordValue: '',

  /**
   * Should we sign the user up for the mailing list?
   * @type {Boolean}
   * @default false
   */
  mailingList: false,

  /**
   * The component can be rendered in two places, within the modal or in a route
   * By default, it will transition to the login route when clicking the login link
   * Otherwise, it will switch the modal view
   * @default true
   * @type {Boolean}
   */
  transitionToRoute: true,

  actions: {
    /**
     * Submit the form data to the server to register the user
     * It pulls form data from the component attributes, and POSTS it to the server
     * On success - Display the success message, and transition to the index
     * On error - Display the error message
     */
    registerSubmit() {
      var self = this;

      var userData = {
        firstName: this.get('firstNameValue'),
        lastName: this.get('lastNameValue'),
        email: this.get('emailValue'),
        password: this.get('passwordValue'),
        mailingList: this.get('mailingList')
      };

      Ember.$.ajax({
        type: 'POST',
        url: '/api/register',
        data: {
          data: {
            type: 'user',
            id: null,
            attributes: userData
          }
        }
      })
      .done((data) => {
        Ember.get(self, 'flashMessages').success(data.meta.success, {
          sticky: true
        });  
        self.sendAction('onSubmitSuccess', 'index');
      })
      .fail((xhr) => {
        var err = JSON.parse(xhr.responseText);
        Ember.get(self, 'flashMessages').danger(err.errors.error);
      });
    },

    /** Clicking on the switch link will transition the view to login (if modal) */
    transitionToLogin() {
      this.sendAction('transitionToLogin', 'login');
    }
  }
});
