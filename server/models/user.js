const mongoose = require("mongoose");
const crypto = require("crypto");
// const  uuidv1  = require("uuid/v1");
// const uuidv4 = require("uuid").v4;
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: 32,
    },
    password: {
      type: String,
      required: true,

    },
    about: {
      type: String,
      trim: true,
    },
    salt: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// virtual fields

// userSchema.methods = {
//   encryptPassword : function(password){
//   if (!password) {
//     return "";
//   }
//   try {
//     return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
//   } catch (error) {
//     return "";
//   }
// }
// };

// userSchema
//   .virtual("password")
//   .get(() => this._password)
//   .set((password) => {
//     this._password = password;
//     this.salt = uuidv4();
//     this.hashed_password = this.encryptPassword(password);
//   });


// middleware that runs before the document is saved
userSchema.pre('save', function(next) {
    // If the pw has been modified, then encrypt it again
    if (this.password){
        // const salt = uuidv4()
        const salt = bcrypt.genSaltSync(10);
        this.salt = salt
        this.password = this.encryptPassword(this.password, this.salt);
    }

  next();
})

// Add custom methods to our User schema
userSchema.methods = {
    // encryptPassword: function(password){
    //      if (!password) {
    //        return "";
    //      }
    //      try {
    //        return crypto
    //          .createHmac("sha1", this.salt)
    //          .update(password)
    //          .digest("hex");
    //      } catch (error) {
    //        return "";
    //      }
    // }
    // Check the passwords on signin
    authenticate: function(plainTextPassword) {
        return bcrypt.compareSync(plainTextPassword, this.password);
    },

    // Hash the passwords
    encryptPassword: function(plainTextPassword, salt) {
        if (!plainTextPassword) {
            return ''
        } else {
            return bcrypt.hashSync(plainTextPassword, salt);
        }
    }
};

module.exports = mongoose.model("User", userSchema);
