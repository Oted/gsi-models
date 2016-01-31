/**
 *  The item model this is an extension of the Models object
 */
module.exports = function(Mongoose) {
    var that = this;

    var itemSchema = new Mongoose.Schema({  
        email       : { type : String, default : null},
        message     : { type : String, required : true },
        ip          : { type : String },
        token       : { type : String, required : true},
        answered    : { type : Boolean, default : false}
    }).plugin(require('mongoose-times'));

    return Mongoose.model('Feedback', itemSchema);
};
