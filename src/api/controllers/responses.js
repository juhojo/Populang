module.exports = {
  response(response) {
    return { response };
  },
  invalid: {
    param(param) {
      return { message: `Invalid parameter: ${param}.` };
    },
    length(param) {
      return { message: `No results found with parameter: ${param}.` };
    },
    separator(param) {
      return { message: `Please use ';' as separator in parameter: ${param}.`}
    },
    requiredParam(param) {
      return { message: `Parameter ${param} is required.` };
    }
  }
}
