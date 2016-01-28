/*
 * Custom Flash Component
 * Used to display flash messages, plugging in to ember-cli-flash
 * Created by calling Ember.get(self, 'flashMessages').success(`message`);
 *
 * I took the default flash used by ember-cli-flash and modified it so that it would have slide-in and out animation
 */

import Ember from 'ember';
import FlashMessage from 'ember-cli-flash/components/flash-message';

const {
  run,
  on,
  set
} = Ember;

export default FlashMessage.extend({
  /**
  * The custom part I implemented.
  * After render, it waits 50 ms and then sets active true, resulting in a css animation to slide the flash message down.
  * After 3s, it sets active false, sliding the flash message back up
  * The default duration is 3500 ms, meaning that after it slides up the message is then destroyed
  */
  _setActive: on('didInsertElement', function() {
    let timeout = this.get('flash.timeout') - 500;

    run.scheduleOnce('afterRender', this, () => {
      run.debounce(this, () => {
        set(this, 'active', true);
      }, 50);
      if(!this.get('flash.sticky')) {
        run.debounce(this, () => {
          if(this.get('active')) { set(this, 'active', false); }
        }, timeout);
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
});