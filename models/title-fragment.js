/**
 *  The item model this is an extension of the Models object
 */
module.exports = function(Mongoose) {
    var that = this;

    var itemSchema = new Mongoose.Schema({ 
        string  : { type : String, required : true },
        count  : { type : Number, required : true },
        total  : { type : Number, required : true },
        median : { type : Number }
    }).plugin(require('mongoose-times'));

    return Mongoose.model('TitleFragment', itemSchema);
};
