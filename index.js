var Mongoose    = require('mongoose');
var Utils       = require('./lib/utils.js');
var Fs          = require('fs');

var internals = {
    'connected' : false,
    'item_types' : [
        'youtube', 
        'img', 
        'gif', 
        'soundcloud', 
        'vimeo', 
        'vine', 
        'text', 
        'video', 
        'twitch', 
        'instagram', 
        'sound', 
        'other'
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

    if (typeof options === "function") {
        done = options;
        options = {};
    }

    Mongoose.connect(options.url || process.env.MONGO_URL, function (err, res) {
        if (err) {
            throw err;
        }

        internals.connected = true;

        Fs.readdirSync(__dirname + '/models').filter(function(model) {
            return model.split('.').pop() === "js";
        }).map(function(model) {
            that.model[model.split('.').shift()] = require('./models/' + model).call(that, Mongoose);
        });
        
        return done();
    });
};

/**
 *  Get the used itemtypes
 */
Models.prototype.getItemTypes = function() {
    return internals['item_types'];
};


//Models.prototype.Mongoose = Mongoose;

module.exports = Models;
