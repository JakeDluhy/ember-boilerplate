/*
 * Custom Flash Component
 * Used to display flash messages, plugging in to ember-cli-flash
 * Created by calling Ember.get(self, 'flashMessages').success(`message`);
 *
 * I took the default flash used by ember-cli-flash and modified it so that it would have slide-in and out animation
 */

import Ember from 'ember';
import computed from 'ember-new-computed';

const {
  String: { classify, htmlSafe },
  Component,
  getWithDefault,
  warn,
  run,
  on,
  get,
  set,
} = Ember;
const {
  readOnly,
  bool
} = computed;

export default Component.extend({
  /** @type {Array} The class name bindings for the component */
  classNameBindings: ['alertType', 'active', 'exiting'],

  /** @type {Boolean} Is the flash message currently active? */
  active: false,

  /** @type {Boolean} Is the flash message exiting at this moment */
  exiting: readOnly('flash.exiting'),

 /**
  * alertType is the type of alert
  * It is styled with different colors depending on the alert
  * @param  {Computed} flash.type - the type of flash
  * @return {String}
  */
  alertType: computed('flash.type', {
    get() {
      const flashType = getWithDefault(this, 'flash.type', '');
      const messageStyle = getWithDefault(this, 'messageStyle', '');
      let prefix = 'alert alert-';

      return `${prefix}${flashType}`;
    },

    set() {
      warn('`alertType` is read only');

      return this;
    }
  }),

  /**
   * Alias for flash.type
   * @param  {Computed} flash.type - the type of flash
   * @return {String}
   */
  flashType: computed('flash.type', {
    get() {
      const flashType = getWithDefault(this, 'flash.type', '');

      return classify(flashType);
    },

    set() {
      warn('`flashType` is read only');

      return this;
    }
  }),

 /**
  * The custom part I implemented.
  * After render, it waits 50 ms and then sets active true, resulting in a css animation to slide the flash message down.
  * After 3s, it sets active false, sliding the flash message back up
  * The default duration is 3500 ms, meaning that after it slides up the message is then destroyed
  */
  _setActive: on('didInsertElement', function() {
    run.scheduleOnce('afterRender', this, () => {
      run.debounce(this, () => {
        set(this, 'active', true);
      }, 50);
      if(!this.get('flash.sticky')) {
        run.debounce(this, () => {
          if(this.get('active')) { set(this, 'active', false); }
        }, 3000);
      }
    });
  }),

  /**
   * On click, set active to false, triggering it to slide up in half a second
   * After it slides up, destroy it
   */
  click() {
    set(this, 'active', false);
    run.debounce(this, this._destroyFlashMessage, 500);
  },

  /**
   * Restroy the component and call to destroy the flash message
   */
  willDestroy() {
    this._super();
    this._destroyFlashMessage();
  },

  /**
   * Destroy the flash message from the queue
   * @private
   */
  _destroyFlashMessage() {
    const flash = getWithDefault(this, 'flash', false);

    if (flash) {
      flash.destroyMessage();
    }
  },

  hasBlock: bool('template').readOnly()
});
