var promisesAplusTests = require("promises-aplus-tests");
var MPromise = require('./me')
promisesAplusTests(MPromise, function (err) {
    // All done; output is in the console. Or check `err` for number of failures.
});