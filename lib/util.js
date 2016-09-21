
const R = require('ramda');

const isNotEmptyOrNil = R.compose(R.not, R.either(R.isEmpty, R.isNil));

module.exports = {
  isNotEmptyOrNil
}
