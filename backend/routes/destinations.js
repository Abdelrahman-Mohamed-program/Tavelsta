const router = require("express").Router();
const jsonCheck = require("../middlewares/json");
const {
  index,
  create,
  update,
  destroy,
  show,
} = require("../controllers/destinations.controller");
const adminAuth = require("../middlewares/adminAuth");
router.use((req, res, next) => {
  console.log("request came to destinations route");
  next();
});
router.get("/", index);

router.get("/:id", show);

router.delete("/:id", adminAuth, destroy);

router.use(jsonCheck);

router.post("/", adminAuth, create);

router.put("/:id", update);

module.exports = router;
