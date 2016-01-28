import Ember from 'ember';

export function initialize() {
  Ember.$.ajaxSetup({
    contentType: 'application/json',
    processData: false,
    beforeSend(jqXHR,options) {
      if (typeof options.data !== "string") {
        options.data = JSON.stringify(options.data);
      }
    }
  });
}

export default {
  name: 'configure-jquery',
  initialize
};
