
var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
  text: String,
  author: {
     id: {
       //dodati automatski iz dba user iz anse scheme User
       type: mongoose.Schema.Types.ObjectId,
       ref: "User"
     },
     username: String
  }
});



module.exports = mongoose.model("Comment", commentSchema);
