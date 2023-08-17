// logic for router.route('/').post(registration);
// logic for registration

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");


//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => 

{
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

// We will use this User model to structure the data in our database

  const userExists = await User.findOne({ email }); //findOne is MongoDB Query

// if email exist, we will throw that user already exist
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
// if email does not exist, create new one or Add it 

  const user = await User.create({    //user.create is MongoDb Query
    name,
    email,
    password,
    pic,
  });

  if (user) {                 // is user creats, it will send to our user
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
      
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
// while login,  if user exists and matches the password which is 
//present in our DB : bellow code
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });


 //@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);

});






module.exports = {  registerUser , authUser, allUsers };