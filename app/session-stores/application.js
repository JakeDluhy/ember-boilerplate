/* global localStorage */
import Ember from 'ember';
import objectsAreEqual from 'ember-simple-auth/utils/objects-are-equal';
import Base from 'ember-simple-auth/session-stores/base';

const { on } = Ember;

/*
 * Custom store based off of the local storage store, but utilizing session storage unless they explicitly
 * want to be remembered
 */
export default Base.extend({
  /** @type {Object} The store object from ember simple auth */
  store: Ember.inject.service('store'),

  /** @type {String} The localstorage key */
  key: 'ember_simple_auth:session',

  /** @type {String} The jwtKey */
  jwtKey: 'jwtKey',

  /** On setup, bind to changes in local storage */
  _setup: on('init', function() {
    this._bindToStorageEvents();
  }),

  /**
   * Persist the data from logging in to the store
   * @param  {Object} data - The data returned from logging in
   * Set the data to either localstorage or sessionstorage
   */
  persist(data) {
    let stringData = JSON.stringify(data || {});

    // Because our current user service requires the jwtKey in localStorage, we have to set it twice
    if(data.authenticated.rememberMe) {
      localStorage.setItem(this.key, stringData);
      localStorage.setItem(this.jwtKey, data.authenticated.token);
      sessionStorage.removeItem(this.key);
      sessionStorage.removeItem(this.jwtKey);
    } else {
      localStorage.removeItem(this.key);
      localStorage.removeItem(this.jwtKey);
      sessionStorage.setItem(this.key, stringData);
      sessionStorage.setItem(this.jwtKey, data.authenticated.token);
    }
    this._lastData = this.restore();
  },

  /** Restore the session by checking whether data exists in ember-simple-auth's key store */
  restore() {
    let data = localStorage.getItem(this.key) || sessionStorage.getItem(this.key);
    let parsedData = JSON.parse(data);
    return parsedData || {};
  },

  /** Remove all jwt keys from storage */
  clear() {
    localStorage.removeItem(this.key);
    localStorage.removeItem(this.jwtKey);
    sessionStorage.removeItem(this.key);
    sessionStorage.removeItem(this.jwtKey);
    this._lastData = {};
  },

  /**
   * Bind to changes in the storage
   * @private
   * Triggers sessionDataUpdated if there are changes in the storage data
   */
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
