import Ember from 'ember';

export default Ember.Component.extend({
  /** @type {String} Set the tag name for the component */
  tagName: 'div',

  /** @type {Array} Bind the class to attributes */
  classNameBindings: [':modal-wrapper', 'isOpen'],

  /**
   * The modal title to display on the header
   * @type {String}
   * @default ''
   */
  modalTitle: '',
  
  /**
   * Is the modal open? This should be bound to an outside property so that it
   * can be opened or closed from within the component or outside it
   * @type {Boolean}
   */
  isOpen: null,

  /**
   * If true, show the overlay behind the modal, darkening the reset of the window
   * @type {Boolean}
   * @default true
   */
  withOverlay: true,

  /**
   * If true, allow any click outside the modal to close it
   * @type {Boolean}
   * @default true
   */
  clickOutsideToClose: true,

  /**
   * Animate the modal as it gets opened or closed
   * @observes isOpen
   */
  openCloseModal: function() {
    if(this.get('isOpen')) {
      this.$().fadeIn(300);  
    } else {
      this.$().fadeOut(300);
    }
  }.observes('isOpen'),

  /**
   * When clicking on the component (which takes up the whole screen)
   * Check whether the clickOutsideToClose option is true, and that they did indeed click outside the modal
   * If so, set the modal open property to false
   * @param  {object} ev - The jquery event on click
   */
  click(ev) {
    var eventTarget = $(ev.target);
    if(this.get('clickOutsideToClose') && (eventTarget.hasClass('modal-overlay') || eventTarget.hasClass('modal-wrapper'))) {
      this.set('isOpen', false);
    }
  },

  actions: {
    /** Close the model by setting isOpen to false */
    closeModal() {
      this.set('isOpen', false);
    }
  }
});
