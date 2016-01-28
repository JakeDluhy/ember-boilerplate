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

describe('Acceptance: UsersRegister', function() {
  var application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit /users/register', function() {
    visit('/users/register');

    andThen(function() {
      expect(currentPath()).to.equal('users.register');
    });
  });

  describe('interacting with the page', function() {
    beforeEach(function() {
      visit('/users/register');
    });

    it('can fill in and submit the form', function() {
      fillIn('.spec-user-register-wrapper .spec-first-name-input input', 'Foo');
      fillIn('.spec-user-register-wrapper .spec-last-name-input input', 'Bar');
      fillIn('.spec-user-register-wrapper .spec-email-input input', 'foo.bar@example.com');
      fillIn('.spec-user-register-wrapper .spec-password-input input', 'foobarchoo');
      click('.spec-user-register-wrapper .spec-user-register-submit');

      andThen(() => {
        expect(currentPath()).to.equal('index');
        expect($('.flash-content')).to.have.length(1);
      });
    });

    it('can link to the login page', function() {
      click('.spec-users-login');

      andThen(() => {
        expect(currentPath()).to.equal('users.login');
      });
    });
  });
});
