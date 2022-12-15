const express = require('express');
const router = express.Router();
const JewelRepo = require('../utils/repositoryJewels');
router.get('/', JewelRootAction);
router.get('/list', JewelListAction);
router.get('/show/:Jewel_ID', JewelShowAction);
router.get('/del/:Jewel_ID', JewelDelAction);
router.get('/edit/:Jewel_ID', JewelEditAction);
router.post('/update/:Jewel_ID', JewelUpdateAction);
router.get('/Category/:Jewel_category', GetCategory);
router.get('/Price/:price', Getprice);
router.get('/Material/:Jewel_material', GetMaterial);
router.get('/AcessCol', JewelUsers);



function JewelRootAction(request, response) {
    response.redirect("/Jewels/list");
}

async function JewelListAction(request, response) {
    var Jewels = await JewelRepo.getAllJewels(); 
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    response.render("jewel_list", { "Jewels": Jewels, "flashMessage": flashMessage });
}

async function GetCategory(request, response) {
    let Cat = await JewelRepo.getOneCategory(request.params.Jewel_category); 
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    response.render("Category", { "Cat": Cat, "flashMessage": flashMessage });
}

async function GetMaterial(request, response) {
    let Mat = await JewelRepo.getOneMaterial(request.params.Jewel_material); 
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    response.render("Material", { "Mat": Mat, "flashMessage": flashMessage });
}

async function Getprice(request, response) {
    let price = await JewelRepo.getbyprice(request.params.price); 
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    response.render("Price", { "Pri": price, "flashMessage": flashMessage });
}

async function JewelShowAction(request, response) {
    var Jewel = await JewelRepo.getOneJewel(request.params.Jewel_ID);
    response.render("Jewel_show", { "OneJewel": Jewel });
}

async function JewelEditAction(request, response) {
    var OneJewel = await JewelRepo.getOneJewel(request.params.Jewel_ID);
    var Jewel_id = request.params.Jewel_ID;
    if (Jewel_id!=="0")
        var jewel = await JewelRepo.getOneJewel(Jewel_id);
    else
        var jewel = JewelRepo.getBlankJewels();
    response.render("Jewel_edit", { "OneJewel":jewel,"Name":OneJewel });
}

async function JewelDelAction(request, response) {
    var numRows = await JewelRepo.delOneJewel(request.params.Jewel_ID);
    request.session.flashMessage = "ROWS DELETED: "+numRows;
    response.redirect("/Jewels/list");
} 

async function JewelUpdateAction(request, response) {
    var Jewel_ID = request.params.Jewel_ID;
    if (Jewel_ID==="0") Jewel_ID = await JewelRepo.addOneJewel(request.body.Jewel_name);
    var numRows = await JewelRepo.editOneJewel(
    	Jewel_ID, 
        request.body.Jewel_material, 
        request.body.size, 
        request.body.price, 
        request.body.Jewel_name,
        request.body.Stone,
        request.body.Jewel_category,
        request.body.Stock);
    request.session.flashMessage = "ROWS UPDATED: "+numRows;
    response.redirect("/Jewels/list");
}

async function JewelUsers(request, response) {
    if(request.isAuthenticated()){
        if(request.user.Users_role === "Users"){
            var jewel = await JewelRepo.getAllJewels();
            response.render("jewel_list_user", {"Jewels": jewel});
        }
        var jewel = await JewelRepo.getAllJewels();
        response.render("jewel_list", {"Jewels": jewel});
    } response.render("auth_view");
}


module.exports = router;