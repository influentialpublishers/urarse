
const Router = require('../../router');
const Sinon = require('sinon');
const demand = require('must');

describe('URARSE Router', function() {

  router = null;
  route_map = null;

  beforeEach(function() {
    route_map = {
      test: {
        route: (x) => { return x  }
      }
    , other: {
        route: (x) => { return x + 'a'  }
      }
    , this: {
        is: {
          super: {
            deep: {
              and: {
                stuff: (x) => { return x  }
              }
            }
          }
        }
      }
    };
    router = Router(route_map);
  });

  describe('Router Init', function() {

    it('should error out when not given a config', function(done) {
      const throwFunc = () => {
        Router();
      }

      throwFunc.must.throw(Error);

      done();

    });

    it('should return a router when given a config', function(done) {

      router.must.be.an.object();
      router.must.have.keys(['route', 'routeAndExecute', 'routeExists']);

      done();

    });

  });

  describe('Router.route(str)', function() {

    it('should throw an error when a route isn\'t found', function(done) {

      const test_str = 'test.route.none';

      const throwFunc = () => {
        router.route(test_str);
      }

      throwFunc.must.throw(Error);

      done();

    });

    it('should return a function on a found route', function(done) {

      const test_str = 'test.route';

      router.route(test_str).must.be.a.function();

      done();

    });

  });

  describe('Router.routeExists(str)', function() {

    it('should return false for a missing route', function(done) {

      const test_str = 'test.fake.route';

      router.routeExists(test_str).must.be.false();

      done();

    });

    it('should return true for an existing route.', function(done) {

      const test_str = 'test.route';

      router.routeExists(test_str).must.be.true();

      done();

    });

  });

  describe('Router.routeAndExecute(str, payload)', function() {

    it('should return the result of running the function at the route', function(done) {

      const test_str = 'test.route';
      const payload = 'blah';
      const expected = 'blah';

      (router.routeAndExecute(test_str, payload)).must.eql(expected);

      done();

    });

    it('should return the result of running the function (2)', function(done) {

      const test_str = 'other.route';
      const payload = 'blah';
      const expected = 'blaha';

      (router.routeAndExecute(test_str, payload)).must.eql(expected);

      done();

    });

    it('should throw an error on missing route', function(done) {

      const test_str = 'test.fake.route';
      const payload = 'blah';

      const throw_func = () => {
        router.routeAndExecute(test_str, payload)
      }

      throw_func.must.throw(Error);

      done();

    });

  });

});

