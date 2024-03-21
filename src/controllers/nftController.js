import {StatusCodes} from "http-status-codes";
import {orbitDB} from "../config/orbitDBConnection.js";
import {orbitdb} from "../config/createDB.js";
import {OrbitDBAccessController} from "@orbitdb/core";


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
        const options = {
            EXPERIMENTAL: {
                pubsub: true,
            },
            accessController: {
                write: ['*']
            }
        }
        // const db = await orbitdb.open('nodejs', { AccessController: OrbitDBAccessController({ write: ['*'] }) })
        const name = process.env.ORBIT_DB_NAME
        const type="documents"
        const db = await orbitdb.open(name, { AccessController: OrbitDBAccessController({ write: ['*'] }) }, type)
        console.log(db, 'cont')
        const a = await db.add(nftMetadata);
        console.log({a}, 'A')
        // res.sendStatus(200);
        res.status(StatusCodes.OK).json(await db.all())
    } catch (e) {
        console.log('ERROR', e)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e })
    }
}
