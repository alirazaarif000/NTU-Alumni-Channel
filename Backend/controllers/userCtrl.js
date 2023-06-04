const Users = require("../models/userModel");

const userCtrl = {
  searchUser: async (req, res) => {
    try {
      let users = await Users.find({
        _id: { $ne: req.user._id }, // Exclude the logged-in user
        username: { $regex: req.query.username },
        role: { $ne: "admin" } // Exclude users with the role "admin"
      })
        .limit(10)
        .select("fullname username avatar userType");

      res.json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id)
        .select("-password")
        .populate("followers following", "-password");

      if (!user) {
        return res.status(400).json({ msg: "requested user does not exist." });
      }

      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateStatus: async (req, res) => {
    try {
      const user = await Users.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      ).select("-password");
  
      if (!user) {
        return res.status(400).json({ msg: "Requested user does not exist." });
      }
  
      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await Users.find({
        _id: { $ne: req.user._id }
      }).select("-password");

      res.json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
  ,

  updateUser: async (req, res) => {
    try {
      const {
        avatar,
        fullname,
        username,
        email,
        mobile,
        address,
        story,
        website,
        gender,
        userType,
        // Teacher
        department,
        designation,
        qualification,

        // Alumni
        degree,
        batch,
        passingYear,

        // Student
        university,
        major,
        semester,
      } = req.body;

      if (!fullname) {
        return res.status(400).json({ msg: "Please add your full name." });
      }

      let newUserObj = {
        avatar,
        fullname,
        mobile,
        address,
        story,
        website,
        gender,
        department: "",
        designation: "",
        qualification: "",

        degree: "",
        batch: "",
        passingYear: "",

        university: "",
        major: "",
        semester: "",
      }

      if (userType === "teacher") {
        newUserObj = {
          ...newUserObj,
          userType: userType,
          department,
          designation,
          qualification,
        }
      } else if (userType === "alumni") {
        newUserObj = {
          ...newUserObj,
          userType: userType,
          degree,
          batch,
          passingYear,
        }
      } else if (userType === "student") {
        newUserObj = {
          ...newUserObj,
          userType: userType,
          university,
          major,
          semester,
        }
      } else if (userType === "admin") {
        let newUserName = username.toLowerCase().replace(/ /g, "");

        const user_name = await Users.findOne({ username: newUserName });
        if (user_name && username !== req.user.username) {
          return res.status(400).json({ msg: "This username is already taken." });
        }

        const user_email = await Users.findOne({ email });
        if (user_email && email !== req.user.email) {
          return res
            .status(400)
            .json({ msg: "This email is already registered." });
        }

        newUserObj = {
          ...newUserObj,
          userType: "admin",
          username,
          email
        }
      } else {
        return res
          .status(400)
          .json({ msg: "User type include only ['teacher', 'alumni', 'student', 'admin']" });
      }

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        newUserObj
      );

      res.json({ msg: "Profile updated successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  follow: async (req, res) => {
    try {
      const user = await Users.find({
        _id: req.params.id,
        followers: req.user._id,
      });
      if (user.length > 0)
        return res
          .status(500)
          .json({ msg: "You are already following this user." });



      const newUser = await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            followers: req.user._id
          },
        },
        { new: true }
      ).populate("followers following", "-password");

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { following: req.params.id } },
        { new: true }
      );

      res.json({ newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  unfollow: async (req, res) => {
    try {


      const newUser = await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { followers: req.user._id }
        },
        { new: true }
      ).populate('followers following', '-password');

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { following: req.params.id } },
        { new: true }
      );

      res.json({ newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  suggestionsUser: async (req, res) => {
    try {
      const newArr = [...req.user.following, req.user._id];

      const num = req.query.num || 10;
      const users = await Users.aggregate([
        { $match: { _id: { $nin: newArr }, role: { $ne: "admin" } } }, // Exclude users with the role "admin"
        { $sample: { size: Number(num) } },
        {
          $lookup: {
            from: "users",
            localField: "followers",
            foreignField: "_id",
            as: "followers",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "following",
            foreignField: "_id",
            as: "following",
          },
        },
        { $project: { password: 0 } }, // Exclude the password field
      ]);

      return res.json({
        users,
        result: users.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

};

module.exports = userCtrl;
