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

    // TODO: move to route
    /**
     * Submit the email to the mailing list
     * On success or failure, display a flash message
     */
    submitToMailingList() {
      var self = this;

      Ember.$.ajax({
        type: 'POST',
        url: '/api/mailing_list',
        data: {
          data: {
            type: 'user',
            id: null,
            attributes: {
              email: self.get('mailingListEmail')
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
