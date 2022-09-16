const express = require("express");
const router = express.Router();
const {
  list,
  show,
  create,
  update,
  remove,
//   showTradesByCustomer,
} = require("../controllers/hikersControllers");

router.get("/", list);
router.get("/:id", show);
// router.get("/:id/trades", showTradesByCustomer);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;