const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// mongoDB User Schema Definition
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// hash the password before creating new user
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

// static login function
userSchema.statics.login = async function (email, password) {
  // find the user in db
  const user = await this.findOne({ email });

  if (user) {
    // check for password
    const auth = await bcrypt.compareSync(password, user.password);
    // if password matches, return the user to controller
    if (auth) {
      return user;
    }

    // user found but password didn't matched
    throw Error("Incorrect password!");
  }
};

module.exports = mongoose.model("user", userSchema);
