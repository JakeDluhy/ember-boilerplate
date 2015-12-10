import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  loginModalOpen: false,
  showLogin: true,

  actions: {
    transitionTo(route) {
      this.transitionToRoute(route);
    },

    openSidenav(toggle) {
      toggle.send('toggleMenu');
    },

    showLoginModal() {
      this.set('loginModalOpen', true);
    },
    closeLoginModal() {
      this.set('loginModalOpen', false);
    },
    loginModalTransition(transitionTo) {
      if(transitionTo === 'login') {
        this.set('showLogin', true);
      } else if(transitionTo === 'register') {
        this.set('showLogin', false);
      }
    },

    logoutUser() {
      this.get('session').invalidate();
    }
  }
});
