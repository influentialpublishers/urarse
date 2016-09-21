
const ObjectPath = require('object-path');
const R = require('ramda');

module.exports = (config) => {

  if (!config) {
    throw new Error('URARSE: Missing configuration.');
  }

  const map = config;
  const route_map = ObjectPath(config);

  const routeExists = route_map.has;

  const routeAndExecute = (route_str, payload) => {
    return route(route_str)(payload);
  }

  const route = (route_str) => {
    if (routeExists(route_str)) {
      return route_map.get(route_str);
    } else {
      throw new Error('URARSE: Route doesn\'t exist');
    }
  };

  return {
    route
  , routeAndExecute
  , routeExists
  };

}
