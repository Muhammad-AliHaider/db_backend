const express = require("express");


const orderController = require("../controller/orderController");

const router = express.Router();

router.get("/", orderController.GetWholeTable);

router.post("/populate", orderController.populateOrders);

router.delete("/deleteAll", orderController.removeAllOrders);

router.get("/getOrderwithConditions", orderController.getOrderwithCondition);

router.post("/AddOrder", orderController.AddNewOrder);

router.put('/updateOrder', orderController.UpdateOrder);

router.delete('/deleteOrder', orderController.DeleteOrderAtID);

module.exports = router;