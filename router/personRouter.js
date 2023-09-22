const express = require("express");


const personController = require("../controller/personController");

const router = express.Router();

router.get("/", personController.GetWholeTable);

router.post("/populate", personController.populatePeople);

router.delete("/deleteAll", personController.removeAllPeople);

router.get("/getPersonwithConditions", personController.getPersonwithCondition);

router.post("/AddPerson", personController.AddNewPerson);

router.put('/updatePerson', personController.UpdatePerson);

router.delete('/deletePerson', personController.DeletePersonAtID);

module.exports = router;