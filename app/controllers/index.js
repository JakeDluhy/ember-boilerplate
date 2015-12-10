import Ember from 'ember';

export default Ember.Controller.extend({
  mailingListEmail: '',
  contactModalOpen: false,

  actions: {
    callToAction() {
      Ember.get(this, 'flashMessages').success('Successfully saved!', {sticky: true});
      // console.log(this.get('modalOpen'));
      // this.set('contactModalOpen', true);
    },
    submitToMailingList() {
      var self = this;

      Ember.$.ajax({
        type: 'POST',
        url: '/api/mailing_list',
        data: {
          email: self.get('mailingListEmail')
        }
      })
      .done((data) => {
        Ember.get(self, 'flashMessages').success(data.success);
      })
      .fail((xhr) => {
        var response = JSON.parse(xhr.responseText);
        Ember.get(self, 'flashMessages').danger(response.error);
      })
    },
    openContactModal() {
      this.set('contactModalOpen', true);
    },
    onContactSubmit() {
      this.set('contactModalOpen', false);
    }
  }
});
