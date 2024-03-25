import express from "express";
import {getNFTInfo, setNFTInfo, getNFTInfoByKey, deleteNFTByKey} from "../controllers/nftController.js";


const router = express.Router()

router.route('/nft/:address').get(getNFTInfo)
router.route('/nft/:address/:key').get(getNFTInfoByKey)
router.route('/nft/:address').post(setNFTInfo)
router.route('/nft/:address/:key').delete(deleteNFTByKey)

export default router
