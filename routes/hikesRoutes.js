const express = require("express");
const router = express.Router();
const { checkJwt } = require("../middleware");
const {
  list,
  show,
  create,
  update,
  remove,
} = require("../controllers/hikesControllers");

router.get("/", checkJwt, list);
router.get("/:id", checkJwt, show);
router.post("/", checkJwt, create);
router.put("/:id", checkJwt, update);
router.delete("/:id", checkJwt, remove);

module.exports = router;
