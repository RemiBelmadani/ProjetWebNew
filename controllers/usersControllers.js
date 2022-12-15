const express = require('express');
const router = express.Router();
const auth = require("../utils/usersAuth.js");
const UsersRepo = require("../utils/userRepository.js");

router.get('/', (req, res) => res.render('auth_view', { extraContent: "" }) );
router.get("/Users/", auth.checkAuthentication("Users"), UsersAction);
router.get("/ADMIN/", auth.checkAuthentication("ADMIN"), UsersAction);
router.get("/protected", protectedGetAction);
router.post("/login", loginPostAction);
router.get("/logout", logoutAction);
router.get("/ADMIN/Users/list", UsersListAction);
router.get("/del/:Users_ID", UserDelAction);
router.get("/edit/:Users_ID", UserEditAction);
router.post("/update/:Users_ID", UserUpdateAction);

async function UsersAction(request, response) {
  let UsersData = await UsersRepo.getOneUser(request.user.Users_name);
  let UsersJson = JSON.stringify(UsersData);
  response.render("auth_view", { "extraContent": UsersJson });
}

async function protectedGetAction(request, response) {
  if (request.isAuthenticated()) {
    if (request.Users.Users_role === "ADMIN") {
      response.redirect("/auth/ADMIN");
    } else {
      response.redirect("/auth/Users");
    }
  } else {
      response.redirect("/auth");
  }
}

async function loginPostAction(request, response) {
  areValid = await UsersRepo.areValidCredentials(request.body.username, request.body.userpass);
  if (areValid) {
    user = await UsersRepo.getOnename(request.body.username);
    request.login(user, function (err) { 
        if (err) { console.log("ERROR"); console.log(err); return next(err); }

        if (request.user.Users_role === "ADMIN") {
            return response.redirect("/auth/ADMIN");
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

async function UsersListAction(request, response) {
  var Users = await UsersRepo.getAllUsers(); 
  var flashMessage = request.session.flashMessage;
  request.session.flashMessage = "";
  response.render("Userslist", { "Users": Users, "flashMessage": flashMessage });
}

async function UserEditAction(request, response) {
  var OneUser = await UsersRepo.getOneUser(request.params.Users_ID);
  var user_id = request.params.Users_ID;
  if (user_id!=="0")
      var user = await UsersRepo.getOneUser(user_id);
  else
      var user = UsersRepo.getBlankUsers();

  console.log(user);
  response.render("Usersedit", { "OneUsers":user,   " Name":OneUser });
}

async function UserDelAction(request, response) {
  var numRows = await UsersRepo.delOneUser(request.params.Users_ID);
  request.session.flashMessage = "ROWS DELETED: "+numRows;
  var Users = await UsersRepo.getAllUsers();
  response.render("Userslist", {"Users":Users});
} 

async function UserUpdateAction(request, response) {
  var Users_ID = request.params.Users_ID;
  if (Users_ID==="0") Users_ID = await UsersRepo.addOneUser(request.body.Users_name);
  var numRows = await UsersRepo.editOneUser(
    Users_ID, 
      request.body.Users_name, 
      request.body.Users_mail, 
      request.body.Users_phone,
      request.body.Users_address,
      request.body.Users_passwords);
  request.session.flashMessage = "ROWS UPDATED: "+numRows;
  response.render("auth_view");
}

module.exports = router;