
const ObjectPath = require('object-path');
const R = require('ramda');
const YAML = require('yamljs');
const Router = require('./router');
const Path = require('path');
const Util = require('./lib/util.js');

let BASE_DIR = process.cwd();

const parseToRequire = function(path) {
  const splitPath = R.split('@', path);
  const requireStmt = require(BASE_DIR + splitPath[0]);

  if(Util.isNotEmptyOrNil(splitPath[1])) {
    return requireStmt[splitPath[1]];
  } else {
    return requireStmt;
  }
};

const mapParse = function(val) {
  if(typeof(val) === 'string') {
    return parseToRequire(val);
  } else {
    return R.map(mapParse, val);
  }
};

const fromFile = function(filepath) {
  const file_type = Path.extname(filepath);

  let json_config = {};
  let tempJSON = null;
  let file_ptr = Path.resolve(process.cwd(), './' + filepath);

  if (file_type === '.yml') {
    tempJSON = YAML.load(file_ptr);
  } else if (file_type === '.json') {
    tempJSON = require(file_ptr);
  } else {
    throw new Error('URARSE: Config file of improper type.');
  }

  return init(tempJSON);
};

const init = function(config) {
    
  if(!config) {
    throw new Error('URARSE: Missing configuration.');
  }

  const configJSON = R.map(mapParse, config);

  return Router(configJSON);

}

module.exports = {
  init
, fromFile
}
