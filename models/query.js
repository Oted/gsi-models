/**
 *  The item model this is an extension of the Models object
 */
module.exports = function(Mongoose) {
    var that = this;

    var itemSchema = new Mongoose.Schema({
        title       : { type : String},
        type        : { type: String, enum: ['trending', 'custom', 'user', 'tag']},
        query       : { type : Mongoose.Schema.Types.Mixed, required : 'query is required.'},
        owner       : { type : String},
        enabled     : { type : Boolean, default : true}
    }).plugin(require('mongoose-times'));

    return Mongoose.model('Query', itemSchema);
};
