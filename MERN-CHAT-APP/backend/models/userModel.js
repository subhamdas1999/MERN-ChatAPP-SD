const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
        name: { type: "String", required: true },

        email: { type: "String", unique: true, required: true },

        password: { type: "String", required: true },

        pic: {
            type: "String",
            //required: true,
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },

        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
  },

  { timestaps: true }

);

// in the login form, bellow code will match whether Enter password and 
// Database already present password matches or not 

userSchema.methods.matchPassword = async function (enteredPassword) 
{
  return await bcrypt.compare(enteredPassword, this.password);
};





// bellow code: Before saving the password into our DB, It will encrypt the pass

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});




const User = mongoose.model("User", userSchema);

module.exports = User;