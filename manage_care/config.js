'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL ||
    'mongodb://TriciaF:tjandsam01@ds231588.mlab.com:31588/patients';

exports.PORT = process.env.PORT || 8080;