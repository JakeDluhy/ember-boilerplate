import Ember from 'ember';

export default Ember.Controller.extend({
  /** @type {object} Inject the session service into the controller */
  session: Ember.inject.service('session'),

  /**
   * Show the login modal?
   * @type {Boolean}
   * @default false
   */
  loginModalOpen: false,

  /**
   * For the login modal, are we showing the login option or the register option?
   * @type {Boolean}
   * @default true
   */
  showLogin: true,

  actions: {
    /** Open the side navigation for mobile */
    openSidenav(toggle) {
      toggle.send('toggleMenu');
    },

    /** Show the login modal */
    showLoginModal() {
      this.set('loginModalOpen', true);
    },

    /** Close the login modal */
    closeLoginModal() {
      this.set('loginModalOpen', false);
    },

    /** Switch the view of register/login for the login modal */
    loginModalTransition(transitionTo) {
      if(transitionTo === 'login') {
        this.set('showLogin', true);
      } else if(transitionTo === 'register') {
        this.set('showLogin', false);
      }
    },

    /** Log out the user by invalidating the session */
    logoutUser() {
      this.get('session').invalidate();
    }
  }
});
