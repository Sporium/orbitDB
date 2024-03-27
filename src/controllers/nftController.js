import {StatusCodes} from "http-status-codes";
import {orbitdb} from "../config/createDB.js";


export const getNFTInfo = async (req, res)=> {
    try {
        const address = req.params.address
        const db = await orbitdb.open(`/orbitdb/${address}`);
        console.log(db, 'access')
        res.status(StatusCodes.OK).json(await db.all())
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message })
    }
}
export const getNFTInfoByKey = async (req, res)=> {
    try {
        const address = req.params.address
        const key = req.params.key
        const db = await orbitdb.open(`/orbitdb/${address}`);
        res.status(StatusCodes.OK).json(await db.get(key))
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message })
    }
}
export const deleteNFTByKey = async (req, res)=> {
    try {
        const address = req.params.address
        const key = req.params.key
        const db = await orbitdb.open(`/orbitdb/${address}`);
        await db.del(key)
        res.status(StatusCodes.OK).json([])
    } catch (e) {
        console.log(e)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message })
    }
}

export const setNFTInfo = async (req, res)=> {
    const {nftMetadata} = req.body
    const address = req.params.address
    try {
        const db = await orbitdb.open(`/orbitdb/${address}`, {
        })
        await db?.put(nftMetadata);
        console.log(await db.all(), 'ALL')
        // res.sendStatus(200);
        res.status(StatusCodes.OK).json(await db.all())
    } catch (e) {
        console.log('ERROR', e)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message })
    }
}
