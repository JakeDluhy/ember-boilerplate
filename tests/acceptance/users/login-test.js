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

describe('Acceptance: UsersLogin', function() {
  var application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit /users/login', function() {
    visit('/users/login');

    andThen(function() {
      expect(currentPath()).to.equal('users.login');
    });
  });

  describe('interacting with the page', function() {
    beforeEach(function() {
      visit('/users/login');
    });

    it('can fill in and submit the form', function() {
      fillIn('.spec-user-login-wrapper .spec-email-input input', 'foo.bar@example.com');
      fillIn('.spec-user-login-wrapper .spec-password-input input', 'foobarchoo');
      click('.spec-user-login-wrapper .spec-user-login-submit');

      andThen(() => {
        expect(currentPath()).to.equal('index');
        expect($('.flash-content')).to.have.length(1);
      });
    });

    it('can link to the forgot password page', function() {
      click('.spec-forgot-link');

      andThen(() => {
        expect(currentPath()).to.equal('users.forgot');
      });
    });

    it('can link to the register page', function() {
      click('.spec-users-register');

      andThen(() => {
        expect(currentPath()).to.equal('users.register');
      });
    });
  });
});
