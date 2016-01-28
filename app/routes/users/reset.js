import Ember from 'ember';
import TransitionHandlers from '../../mixins/transition-handlers';

export default Ember.Route.extend(TransitionHandlers, {
  model(params) {
    // Set resetCode to the url param
    this.set('resetCode', params.resetCode);
  },

  actions: {
    /**
     * Send the request with the new password and the reset code value
     * @param  {String} newPassword - the new password to send with the request
     */
    submitResetPassword(newPassword) {
      let self = this;
      let flashMessages = Ember.get(this, 'flashMessages');

      Ember.$.ajax({
        type: 'PUT',
        url: '/api/users/reset_password',
        data: {
          data: {
            type: 'resetCode',
            id: null,
            attributes: {
              newPassword: newPassword,
              resetCode: self.get('resetCode')
            }
          }
        }
      })
      .done(() => {
        Ember.run(function() {
          flashMessages.success('Password successfully reset. Log in and try it out!');
        });
        self.send('transition', 'index');
      })
      .fail((xhr) => {
        let err = JSON.parse(xhr.responseText);
        Ember.run(function() {
          flashMessages.danger(err.errors.error);
        });
      });
    }
  }
});
