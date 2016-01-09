import Ember from 'ember';

export default Ember.Controller.extend({
  /** @type {String} The value of the email for a user trying to join the mailing list */
  mailingListEmail: '',

  /**
   * Is the contact modal open?
   * @type {Boolean}
   * @default false
   */
  contactModalOpen: false,

  actions: {
    /** Act on the call to action button */
    callToAction() {
      
    },

    /**
     * Submit the email to the mailing list
     * On success or failure, display a flash message
     */
    submitToMailingList() {
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
