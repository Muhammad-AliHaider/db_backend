const express = require("express");


const tableCreationController = require("../controller/tableCreationController");

const router = express.Router();

router.post("/", tableCreationController.CreateDesertsTable , tableCreationController.CreatePersonTable ,tableCreationController.CreateOrdersTable , tableCreationController.CreateTriggersTotalPrice,tableCreationController.CreateTriggerUpdateTotalPrice, tableCreationController.CreateTriggerUpdateTotal,tableCreationController.CreateTriggerDeletePerson, tableCreationController.CreateProcedures);

router.post("/testConnection", tableCreationController.testConnection);

router.post("/dropTables", tableCreationController.DropTables);

module.exports = router;