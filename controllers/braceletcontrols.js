const express = require('express');
const router = express.Router();
const JewelRepo = require('../utils/repositoryJewels');
router.get('/', JewelRootAction);
// router.get('/Images', BraceletJewel);
router.get('/show/:Jewel_ID', JewelShowAction);
router.get('/del/:Jewel_ID', JewelDelAction);
router.get('/edit/:Jewel_ID', JewelEditAction);
router.post('/update/:Jewel_ID', JewelUpdateAction);

function JewelRootAction(request, response) {
    //response.send("ROOT ACTION");
    response.redirect("/Jewels/list");
}

// async function BraceletJewel(request, response) {
//     // response.send("LIST ACTION");
//     var Bracelet = await JewelRepo.getAllBracelets(); 
//     //console.log(Jewels);
//     var flashMessage = request.session.flashMessage;
//     request.session.flashMessage = "";
//     response.render("Bracelet_list", { "Bracelets": Bracelet, "flashMessage": flashMessage });
// }


async function JewelShowAction(request, response) {
    // response.send("SHOW ACTION");
    var Jewel = await JewelRepo.getOneJewel(request.params.Jewel_ID);
    response.render("Jewel_show", { "OneJewel": Jewel });
}
async function JewelEditAction(request, response) {
    // response.send("EDIT ACTION");
    var OneJewel = await JewelRepo.getOneJewel(request.params.Jewel_ID);
    var Jewel_id = request.params.Jewel_ID;
    if (Jewel_id!=="0")
        var jewel = await JewelRepo.getOneJewel(Jewel_id);
    else
        var jewel = JewelRepo.getBlankJewels();
    response.render("Jewel_edit", { "OneJewel":jewel,"Name":OneJewel });
}
async function JewelDelAction(request, response) {
    // response.send("DEL ACTION");
    // TODO: remove extras for car, unless the car cannot be removed!!!
    var numRows = await JewelRepo.delOneJewel(request.params.Jewel_ID);
    request.session.flashMessage = "ROWS DELETED: "+numRows;
    response.redirect("/Jewels/list");
} 

async function JewelUpdateAction(request, response) {
    // response.send("UPDATE ACTION");
    var Jewel_ID = request.params.Jewel_ID;
    if (Jewel_ID==="0") Jewel_ID = await JewelRepo.addOneJewel(request.body.Jewel_name);
    // var isFancy = request.body.car_isFancy === undefined ? 0 : 1; 
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
module.exports = router;