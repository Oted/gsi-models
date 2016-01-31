/**
 *  The item model this is an extension of the Models object
 */
module.exports = function(Mongoose) {
    var that = this;

    var itemSchema = new Mongoose.Schema({
        _hash       : { type : String, required : true },
        value       : { type : Number, required : true },
        adjective   : { type : String },
        ip          : { type : String },
        token       : { type : String, required : true}   
    }).plugin(require('mongoose-times'));

    return Mongoose.model('Rating', itemSchema);
};
