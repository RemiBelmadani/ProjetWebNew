const express = require('express');
const router = express.Router();
const auth = require("../utils/usersAuth.js");
const UsersRepo = require("../utils/userRepository.js");

router.get('/', (req, res) => res.render('auth_view', { extraContent: "" }) );
router.get("/Users", auth.checkAuthentication("Users"), UsersAction);
router.get("/admin", auth.checkAuthentication("ADMIN"), UsersAction);
router.get("/protected", protectedGetAction);
router.post("/login", loginPostAction);
router.get("/logout", logoutAction);

async function UsersAction(request, response) {
  let UsersData = await UsersRepo.getOneUser(request.Users.Users_name);
  let UsersJson = JSON.stringify(UsersData);
  response.render("auth_view", { "extraContent": UsersJson });
}

async function protectedGetAction(request, response) {
  if (request.isAuthenticated()) {
    if (request.Users.Users_role === "ADMIN") {
      response.redirect("/auth/admin");
    } else {
      response.redirect("/auth/Users");
    }
  } else {
      response.redirect("/auth");
  }
}

async function loginPostAction(request, response) {
  areValid = await UsersRepo.areValidCredentials(request.body.Users_name, request.body.Users_passwords);

  if (areValid) {
    Users = await UsersRepo.getOneUsers(request.body.Users_name);
    request.login(Users, function (err) { 
        if (err) { console.log("ERROR"); console.log(err); return next(err); }

        if (request.Users.Users_role === "ADMIN") {
            return response.redirect("/auth/admin");
        } else {
            return response.redirect("/auth/Users");
        }
    });
  } else {
    response.send("Invalid credentials provided");
  }
}

function logoutAction(request, response) {
    request.logout(function(err) {
        if (err) { return next(err); }
        response.redirect('/auth');
    });
}

module.exports = router;