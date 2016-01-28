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
import { authenticateSession } from 'ember-boilerplate/tests/helpers/ember-simple-auth';
import stubLocalStorage from '../../helpers/stub-local-storage';

describe('Acceptance: UsersSettings', function() {
  var application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit /users/settings', function() {
    authenticateSession(application);
    visit('/users/settings');

    andThen(() => {
      expect(currentPath()).to.equal('users.settings');
    });
  });

  it('gets redirected to the index if not logged in', function() {
    this.timeout(5000);
    visit('/users/settings');

    andThen(() => {
      expect(currentPath()).to.equal('users.login');
    });
  });

  describe('interacting with the page', function() {
    beforeEach(function() {
      authenticateSession(application);
      stubLocalStorage();
      visit('/users/settings');
    });

    it('can fill in and submit the settings form', function() {
      fillIn('.spec-first-name input', 'Foo');
      fillIn('.spec-last-name input', 'Bar');
      fillIn('.spec-email input', 'foo.bar@example.com');
      click('.spec-user-settings-submit');

      andThen(() => {
        expect($('.flash-content')).to.have.length(1);
      });
    });

    it('can fill in and submit the change password form', function() {
      fillIn('.spec-old-password input', 'foobarchoo');
      fillIn('.spec-new-password input', 'foobarchoo2');
      fillIn('.spec-confirm-password input', 'foobarchoo2');
      click('.spec-change-password-submit');

      andThen(() => {
        expect($('.flash-content')).to.have.length(1);
      });
    });
  });
});
