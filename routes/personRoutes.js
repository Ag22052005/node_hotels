const express = require("express");
const router = express.Router();
const { jwtmiddleware, createJwt } = require("./../jwt.js");
const Person = require("./../model/person");

// person

// post method to post the person info to /person
router.post("/signup", async function (req, res) {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    const payload = {
      username: response.username,
      id: response.id,
    };
    const token = createJwt(payload);

    console.log("person is saved");
    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error occurred" });
  }
});

router.post("/signin", jwtmiddleware, async (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log(username,password)
    const user = await Person.findOne({ username: username });
    // console.log(user)
    if (!user || (await user.comparePassword(user.password))) {
      return res
        .status(401)
        .json({ error: "username or password is incorrect" });
    }

    payload = {
      username: user.username,
      id: user.id,
    };
    const token = createJwt(payload);
    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error occurred" });
  }
});

router.get("/profile", jwtmiddleware, async (req, res) => {
  try {
    // console.log(req);
    const userData = req.user;
    const user = await Person.findById(userData.id);
    // console.log(user)
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error occurred" });
  }
});

// get method to get the all person from /person

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("persons are fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error occurred" });
  }
});

// parametrized get method -> get the records on the conditions

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // to get the parameter or conditon
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const data = await Person.find({ work: workType });
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "Invalid work type " });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error occurred" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatevalue = req.body;

    const response = await Person.findByIdAndUpdate(personId, updatevalue, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      res.status(404).json({ error: "person not found" });
    } else {
      console.log("person is updated..");
      res.status(200).json(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error occurred" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      res.status(404).json({ error: "person not found" });
    } else {
      console.log("person is deleted...");
      res.status(200).json(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error occurred" });
  }
});

module.exports = router;
