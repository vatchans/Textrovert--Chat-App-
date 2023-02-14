const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: {
      text: {type:String},
      location:{type:Object}
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Messagemodel= mongoose.model("Messages", MessageSchema);
module.exports={Messagemodel}
