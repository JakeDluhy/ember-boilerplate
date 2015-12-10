/* global localStorage */
import Ember from 'ember';
import objectsAreEqual from 'ember-simple-auth/utils/objects-are-equal';
import Base from 'ember-simple-auth/session-stores/base';

const { on } = Ember;

/*
  Custom store based off of the local storage store, but utilizing session storage unless they explicitly
  want to be remembered
*/
export default Base.extend({
  store: Ember.inject.service('store'),

  key: 'ember_simple_auth:session',
  jwtKey: 'jwtKey',

  _setup: on('init', function() {
    this._bindToStorageEvents();
  }),

  persist(data) {
    let stringData = JSON.stringify(data || {});

    // Because our current user service requires the jwtKey in localStorage, we have to set it twice
    if(data.authenticated.rememberMe) {
      localStorage.setItem(this.key, stringData);
      localStorage.setItem(this.jwtKey, data.authenticated.token);
    } else {
      localStorage.removeItem(this.key);
      localStorage.removeItem(this.jwtKey);
      sessionStorage.setItem(this.key, stringData);
      sessionStorage.setItem(this.jwtKey, data.authenticated.token);
    }
    this._lastData = this.restore();
  },

  restore() {
    // Restore from ember-simple-auth's key
    let data = localStorage.getItem(this.key) || sessionStorage.getItem(this.key);
    let parsedData = JSON.parse(data);
    return parsedData || {};
  },

  clear() {
    // Remove all jwt keys
    localStorage.removeItem(this.key);
    localStorage.removeItem(this.jwtKey);
    sessionStorage.removeItem(this.key);
    sessionStorage.removeItem(this.jwtKey);
    this._lastData = {};
  },

  _bindToStorageEvents() {
    Ember.$(window).bind('storage', () => {
      let data = this.restore();
      if (!objectsAreEqual(data, this._lastData)) {
        this._lastData = data;
        this.trigger('sessionDataUpdated', data);
      }
    });
  }
});
