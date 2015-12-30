export function initialize(application) {
  application.inject('route', 'current-user', 'service:current-user');
  application.inject('controller', 'current-user', 'service:current-user');
  application.inject('component', 'current-user', 'service:current-user');
}

export default {
  name: 'current-user',
  initialize
};
