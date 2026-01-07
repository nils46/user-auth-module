const User = require("../models/User");
const bcrypt = require("bcrypt");

/* REGISTER USER */
exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      age,
      gender,
      address
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      age,
      gender,
      address
    });

    req.session.userId = user._id;
    res.redirect("/profile.html");
  } catch (error) {
    console.error(error);
    res.send("Registration failed");
  }
};


/* LOGIN USER*/
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.send("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send("Invalid credentials");
    }

    // create session
    req.session.userId = user._id;

    // redirect to profile after login
    res.redirect("/profile.html");
  } catch (error) {
    console.error(error);
    res.send("Login failed");
  }
};

/*VIEW PROFILE*/
exports.viewProfile = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId)
      .select("-password"); 

    if (!user) {
      return res.send("User not found");
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.send("Unable to fetch profile");
  }
};

/*UPDATE PROFILE (NAME)*/
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, age, gender, address } = req.body;

    await User.findByIdAndUpdate(req.session.userId, {
      name,
      phone,
      age,
      gender,
      address
    });

    res.redirect("/profile.html");
  } catch (error) {
    console.error(error);
    res.send("Profile update failed");
  }
};


/* CHANGE PASSWORD */
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.send("User not found");
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.send("Old password incorrect");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.send("Password changed successfully");
  } catch (error) {
    console.error(error);
    res.send("Password change failed");
  }
};

/*LOGOUT USER*/
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
