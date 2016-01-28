import Ember from 'ember';
import authValidations from '../mixins/auth-validations';

export default Ember.Controller.extend(authValidations, {
  /** @type {String} The value of the email for a user trying to join the mailing list */
  mailingListEmail: '',

  /**
   * Is the contact modal open?
   * @type {Boolean}
   * @default false
   */
  contactModalOpen: false,

  disableSubmit: Ember.computed('mailingListEmail', function() {
    let emailValue = this.get('mailingListEmail');

    // Check 1) Is the email valid?
    if(emailValue && emailValue !== '' && !this.get('emailValidation').isError(emailValue)) {
      return false;
    }
    return true;
  }),

  actions: {
    /** Act on the call to action button */
    callToAction() {
      Ember.get(this, 'flashMessages').success('Hello');
    },

    /**
     * Submit the email to the mailing list
     * On success or failure, display a flash message
     */
    submitToMailingList() {
      if(this.get('disableSubmit')) { return; }
      
      this.send('persistMailingListSignup', this.get('mailingListEmail'));
    },

    /** Open the contact modal */
    openContactModal() {
      this.set('contactModalOpen', true);
    },

    /** Close the contact modal */
    onContactSubmit() {
      this.set('contactModalOpen', false);
    }
  }
});
