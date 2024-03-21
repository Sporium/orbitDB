import express from "express";
import {getNFTInfo, setNFTInfo} from "../controllers/nftController.js";


const router = express.Router()

router.route('/nft').get(getNFTInfo)
router.route('/nft').post(setNFTInfo)

export default router
