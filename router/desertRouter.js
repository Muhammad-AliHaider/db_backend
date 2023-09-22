
const express = require("express");
const desertController = require("../controller/desertsController");


const router = express.Router();

router.get("/", desertController.GetWholeTable);

router.post("/populate", desertController.populateDeserts);

router.delete("/deleteAll", desertController.removeAllDeserts);

router.get("/getDesertwithConditions", desertController.getDesertwithCondition);

router.post("/AddDesert", desertController.AddNewDesert);

router.put('/updateDesert', desertController.UpdateDesert);

router.delete('/deleteDesert', desertController.DeleteDesertAtID);



module.exports = router;