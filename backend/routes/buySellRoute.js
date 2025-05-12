import express from "express";
import BuySellController from "../controller/BuySellController.js";
import multer from "../middleware/multer.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/all", BuySellController.getAllCattleListings)
router.put('/putBuySell',BuySellController.createCattleListing)
router.get("/getspecific",BuySellController.mycattleListings)
router.delete("/deleteCattle/:id", BuySellController.deleteBuySellById);
router.put("/updateCattle/:id", BuySellController.updateCattleListing);
export default router