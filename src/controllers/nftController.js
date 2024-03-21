import {StatusCodes} from "http-status-codes";
import {orbitDB} from "../config/orbitDBConnection.js";


export const getNFTInfo = async (req, res)=> {
    try {
        const db = await orbitDB.getDB();
        res.status(StatusCodes.OK).json(await db.all())
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e })
    }
}

export const setNFTInfo = async (req, res)=> {
    const {hashedKey,nftMetadata} = req.body
    try {
        const db = await orbitDB.getDB();
        const a = await db.put(nftMetadata);
        console.log({a})
        res.sendStatus(200);
        res.status(StatusCodes.OK).json(await db.all())
    } catch (e) {
        console.log('ERROR', e)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e })
    }
}
