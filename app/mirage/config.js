import Mirage from 'ember-cli-mirage';

export default function() {
  this.passthrough('http://localhost:3300');

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing
  this.namespace = 'api';

  /** GET routes */
  this.get('/users/:id', function(db, request) {
    let user = db.users.find(request.params.id);

    if(user) {
      return new Mirage.Response(200, {}, {
        data: {
          type: 'user',
          id: user.id,
          attributes: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mailingList: user.mailingList
          }
        }
      });
    } else {
      return new Mirage.Response(404, {}, {
        errors: {error: 'User not found'}
      });
    }
  });

  this.get('/users/current_user', function(db, request) {
    if(request.requestHeaders.AUTHORIZATION) {
      let user = db.users.where({email: 'foo.bar@example.com'})[0];

      return {
        data: {
          type: 'user',
          id: user.id,
          attributes: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mailingList: user.mailingList
          }
        }
      };
    } else {
      return new Mirage.Response(500, {}, {
        errors: { error: 'Unauthorized request for the current user' }
      });
    }
  });

  /** POST routes */
  this.post('/login', function(db, request) {
    let requestData = JSON.parse(request.requestBody);
    console.log(requestData);
    let user = db.users.where({email: requestData.email})[0];

    if(user && user.password === requestData.password) {
      return new Mirage.Response(200, {}, {
        meta: {
          token: '123abc',
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
        }
      });
    } else if(user && user.password !== requestData.password) {
      return new Mirage.Response(401, {}, {
        errors: { error: 'Incorrect password' }
      });
    } else {
      return new Mirage.Response(404, {}, {
        errors: { error: 'User not found' }
      });
    }
  });

  this.post('/register', function(db, request) {
    let userAttributes = JSON.parse(request.requestBody).data.attributes;

    db.users.insert(userAttributes);
    return new Mirage.Response(201, {}, {
      meta: {success: "Congrats, you're in! Once you verify your email you'll be good to go!"}
    });
  });

  this.post('/mailing_list', function(db, request) {
    let email = JSON.parse(request.requestBody).data.attributes.email;

    db.users.insert({ email: email, mailingList: true });
    return new Mirage.Response(201, {}, {
      meta: {success: "Congratulations! You're all signed up!"}
    });
  });

  this.post('/contact', function(db, request) {
    return { meta: { success: "Got it - We'll get back to you soon!" } };  
  });

  this.post('/recover_password', function(db, request) {
    let user = db.users.where({email: JSON.parse(request.requestBody).data.attributes.email})[0];
    db['password-resets'].insert({userId: user.id});

    return { meta: {success: 'Please check your email for further instructions'} };
  });

  /** PUT routes */
  this.put('/users/reset_password', function(db, request) {
    let requestData = JSON.parse(request.requestBody);

    let passwordReset = db['password-resets'].where({resetCode: requestData.data.attributes.resetCode})[0];
    let user = db.users.where({id: passwordReset.id})[0];
    db.users.update(user.id, {password: requestData.data.attributes.newPassword});

    return { meta: { token: '123abc' } };
  });

  this.put('/users/:id', function(db, request) {
    console.log(request);
    db.users.update(request.params.id, JSON.parse(request.requestBody).data.attributes);

    return { meta: { token: '123abc' } };
  });

  this.put('/users/:id/change_password', function(db, request) {
    let requestData = JSON.parse(request.requestBody);

    let user = db.users.find(requestData.data.id);
    if(user.password === requestData.data.attributes.oldPassword) {
      return new Mirage.Response(201, {}, { meta: { token: '123abc' } });
    } else {
      return new Mirage.Response(400, {}, { errors: { error: ' Only a user can update their own password' } });
    }
  });

  /** DELETE routes */

  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;

      return {
        contact: db.contacts.find(contactId),
        addresses: db.addresses.where({contact_id: contactId})
      };
    });

  */
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
