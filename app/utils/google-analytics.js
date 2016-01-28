import Ember from 'ember';

export default {
  setAndTrackPageview() {
    if(ga === undefined) { return; }

    Ember.run.debounce(this, () => {
      ga('set', 'page', window.location.href);
      ga('send', 'pageview');
    }, 100);
  }
};