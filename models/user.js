/**
 * Loose user
 */
module.exports = function(Mongoose) {
    var userSchema = new Mongoose.Schema({
        _token          : { type : String, required : true, unique : true },
        email           : { type : String, default : null },
        ip              : { type : String, required : true },
        fetches         : { type : Number, default : 0 },
        visits          : { type : Number, default : 1 },
        user_agent      : { type : String, default : 'none'},
        queries         : { type : Array, default : [] },
        name            : { type : String, default : 'user' },
        subscriptions   : { type : Array, default : [] }
    }).plugin(require('mongoose-times'));

    return Mongoose.model('User', userSchema);
};
