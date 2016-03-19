/**
 *  The item model this is an extension of the Models object
 */
module.exports = function(Mongoose) {
    var itemSchema = new Mongoose.Schema({
        title           : { type : String },
        _hash           : { type : String, unique : true },
        _unhash         : { type : String },
        type            : { type: String },
        response_time   : { type : Number },
        es_query        : { type : Mongoose.Schema.Types.Mixed, required : 'es_query is required.'},
        owner           : { type : String },
        enabled         : { type : Boolean, default : true },
        queried         : { type : Number, default : 0 },
        results         : { type : Number, default : 0 }
    }).plugin(require('mongoose-times'));

    return Mongoose.model('Query', itemSchema);
};
