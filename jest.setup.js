// Importing fetch API into Jest
const fetchPolifill = require('whatwg-fetch')
window.fetch = fetchPolifill.fetch
window.Request = fetchPolifill.Request
window.Headers = fetchPolifill.Headers
window.Response = fetchPolifill.Response


// Jest max time before failure
jest.setTimeout(20000); // in milliseconds
