var Mongoose        = require('mongoose');
var Utils           = require('./lib/utils.js');
var Fs              = require('fs');
var ElasticSearch   = require('elasticsearch');

var Elastic;

var internals = {
    'connected' : false,
    'item_types' : [
        'youtube',
        'img',
        'gif',
        'soundcloud',
        'vimeo',
        'text',
        'video',
        'twitch',
        'sound',
        'other'
    ],
    'category_types' : [
        'inspiring',
        'sport',
        'nostalgic',
        'music',
        'documentary',
        'fails',
        'science',
        'creative',
        'funny',
        'gaming',
        'creepy',
        'beautiful',
        'rection',
        'news'
    ]
};

/**
 *  Set the models in the constructor
 */
function Models() {
    this.model = {};
};

/**
 *  Connect to the database
 */
Models.prototype.connect = function(options, done) {
    var that = this;

    if (!process.env.ELASTIC_URL) {
        throw new Error('No elastic url found in .env');
    }

    if (typeof options === "function") {
        done = options;
        options = {};
    }

    return Mongoose.connect(options.url || process.env.MONGO_URL, function (err, res) {
        if (err) {
            return done(err);
        }

        internals.connected = true;

        Elastic = new ElasticSearch.Client({
            host: process.env.ELASTIC_URL
        });

        Fs.readdirSync(__dirname + '/models').filter(function(model) {
            return model.split('.').pop() === "js";
        }).map(function(model) {
            that.model[model.split('.').shift()] = require('./models/' + model).call(that, Mongoose, Elastic);
        });

        return done();
    });
};

/**
 *  Query elastic for items
 */
Models.prototype.searchItems = function (query, done) {
    return Elastic.search({
        index: 'gsi',
        body: query
    }, done);
};

/**
 *  Get the used categories
 */
Models.prototype.getItemCategories = function() {
    return internals['item_types'];
};

/**
 *  Get the used itemtypes
 */
Models.prototype.getItemTypes = function() {
    return internals['item_types'];
};

module.exports = new Models();
