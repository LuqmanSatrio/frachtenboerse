var configValues = require('./config');

module.exports = {
    getDbConnectionString: function () {
        return "mongodb://" + configValues.uname +
            ":" + configValues.pwd
            + "@ds062807.mlab.com:62807/nodetodosamplaspdlaps"
    }
};