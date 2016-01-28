/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../../helpers/start-app';
import destroyApp from '../../helpers/destroy-app';

describe('Acceptance: UsersReset', function() {
  var application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit /users/reset', function() {
    visit('/users/reset/123abc');

    andThen(function() {
      expect(currentPath()).to.equal('users.reset');
    });
  });

  describe('interacting with the page', function() {
    beforeEach(function() {
      visit('/users/reset/123abc');
    });

    it('can fill in and submit the form', function() {
      fillIn('.spec-new-password input', 'foobarchoo');
      fillIn('.spec-confirm-password input', 'foobarchoo');
      click('.spec-change-password-submit');

      andThen(() => {
        expect(currentPath()).to.equal('index');
        expect($('.flash-content')).to.have.length(1);
      });
    });
  });
});
