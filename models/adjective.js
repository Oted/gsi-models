/**
 *  The item model this is an extension of the Models object
 */
module.exports = function(Mongoose) {
    var that = this;

    var itemSchema = new Mongoose.Schema({ 
        positive    : { type : Boolean, required : true },
        expression  : { type : String, unique : true, lowercase : true}   
    }).plugin(require('mongoose-times'));

    return Mongoose.model('Adjective', itemSchema);
};
