import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  firstName: faker.name.firstName,
  lastName: faker.name.lastName,
  email: function(i) {
    return `person${i}@example.com`;
  },
  password: faker.random.uuid,
  mailingList: faker.random.boolean
});
