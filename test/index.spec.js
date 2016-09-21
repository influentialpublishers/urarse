
const RouterFactory = require('../index.js');
const Sinon = require('sinon');
const demand = require('must');

describe('URARSE Router Factory', function() {

  router = null;
  route_map = null;
  yaml_path = '/test/assets/test.yml';
  json_path = '/test/assets/test.json';

  beforeEach(function() {
    route_map = {
      test: {
        route: '/test/assets/test_funcs.js@returnFn'
      }
    , other: {
        route: '/test/assets/test_funcs.js@returnFn'
      }
    , this: {
        is: {
          super: {
            deep: {
              and: {
                stuff: '/test/assets/test_funcs.js@returnFn'
              }
            }
          }
        }
      }
    };
    router = RouterFactory.init(route_map);
    yamlrouter = RouterFactory.fromFile(yaml_path);
    jsonrouter = RouterFactory.fromFile(json_path);
  });

  describe('Router Init', function() {
    
    it('should create a functional router.', function(done) {

      router.must.be.an.object();

      done();

    });

    it('should fail if given a wrong file type', function(done) {

      const failFn = () => { RouterFactory.fromFile('blah.psd'); } 

      failFn.must.throw(Error);

      done();

    });

    it('should fail if given empty JSON', function(done) {

      const failFn = () => { RouterFactory.init(null); }
      
      failFn.must.throw(Error);

      done();

    });

    it('should allow for YAML config', function(done) {

      const new_router = RouterFactory.fromFile('/test/assets/test.yml');

      new_router.must.be.an.object();

      done();

    });

  });

  describe('Router Functionality after creation (RAW)', function() {

    it('should return a router with functions from strings', function(done) {

      const route_name = 'test.route';

      router.route(route_name).must.be.a.function();
      
      done();

    });

    it('should return functions that can be called', function(done) {

      const route_name = 'test.route';
      let fn = router.route(route_name);

      fn.must.be.a.function();
      // this is an identity function for testing.
      fn('blah').must.eql('blah');

      done();

    });

    it('should allow instant route and execute', function(done) {

      const route_name = 'other.route';
      const payload = 'foo';
      const expected = 'foo';
      
      router.routeAndExecute(route_name, payload).must.eql(expected);

      done();

    });

    it('should check for existance of routes', function(done) {

      const route_name = 'fake.route.name';

      router.routeExists(route_name).must.be.false();

      done();
      
    });
  });

  describe('Router Functionality after creation (YAML)', function() {

    it('should return a router with functions from strings (YAML)', function(done) {

      const route_name = 'test.route';

      yamlrouter.route(route_name).must.be.a.function();
      
      done();

    });

    it('should return functions that can be called (YAML)', function(done) {

      const route_name = 'test.route';
      let fn = yamlrouter.route(route_name);

      fn.must.be.a.function();
      // this is an identity function for testing.
      fn('blah').must.eql('blah');

      done();

    });

    it('should allow instant route and execute (YAML)', function(done) {

      const route_name = 'other.route';
      const payload = 'foo';
      const expected = 'foo';
      
      yamlrouter.routeAndExecute(route_name, payload).must.eql(expected);

      done();

    });

    it('should check for existance of routes (YAML)', function(done) {

      const route_name = 'fake.route.name';

      yamlrouter.routeExists(route_name).must.be.false();

      done();
      
    });
  });

  describe('Router Functionality after creation (JSON)', function() {

    it('should return a router with functions from strings (JSON)', function(done) {

      const route_name = 'test.route';

      jsonrouter.route(route_name).must.be.a.function();
      
      done();

    });

    it('should return functions that can be called (JSON)', function(done) {

      const route_name = 'test.route';
      let fn = jsonrouter.route(route_name);

      fn.must.be.a.function();
      // this is an identity function for testing.
      fn('blah').must.eql('blah');

      done();

    });

    it('should allow instant route and execute (JSON)', function(done) {

      const route_name = 'other.route';
      const payload = 'foo';
      const expected = 'foo';
      
      jsonrouter.routeAndExecute(route_name, payload).must.eql(expected);

      done();

    });

    it('should check for existance of routes (JSON)', function(done) {

      const route_name = 'fake.route.name';

      jsonrouter.routeExists(route_name).must.be.false();

      done();
      
    });

  });

});

