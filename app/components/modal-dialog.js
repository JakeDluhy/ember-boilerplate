import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNameBindings: ['isOpen', ':modal-wrapper'],

  // Default modal settings, all of which can be overridden
  modalTitle: '',
  // isOpen should have a two way binding with an outside property to trigger the opening
  isOpen: null,
  withOverlay: true,
  clickOutsideToClose: true,

  // Toggle the modal open and closed, fading it in and out using jQuery
  openCloseModal: function() {
    if(this.get('isOpen')) {
      this.$().fadeIn(300);  
    } else {
      this.$().fadeOut(300);
    }
  }.observes('isOpen'),

  // When clicking on the component (which takes up the whole screen)
  // Check whether the clickOutsideToClose option is true, and that they did indeed click outside the modal
  // If so, set the modal open property to false
  click(ev) {
    var eventTarget = $(ev.target);
    if(this.get('clickOutsideToClose') && (eventTarget.hasClass('modal-overlay') || eventTarget.hasClass('modal-wrapper'))) {
      this.set('isOpen', false);
    }
  },

  actions: {
    closeModal() {
      this.set('isOpen', false);
    }
  }
});
