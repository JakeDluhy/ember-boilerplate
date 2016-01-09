/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe.only('Acceptance: Contact', function() {
  var application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit /contact', function() {
    visit('/contact');

    andThen(function() {
      expect(currentPath()).to.equal('contact');
    });
  });

  describe('interacting with the page', function() {
    beforeEach(function() {
      visit('/contact');
    });

    it('can fill in the form and submit', function() {
      fillIn('.spec-name-value input', 'Foo Bar');
      fillIn('.spec-email-value input', 'foo.bar@example.com');
      fillIn('.spec-comment-value textarea', 'My awesome comment');
      click('.spec-user-contact-submit');

      andThen(() => {
        // setTimeout(function() {
          expect(currentPath()).to.equal('index');
          // expect($('.flash-content')).to.have.length(1);
          // done();
        // }, 100);
      });
    });
  });
});
