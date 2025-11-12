import express, {type Request, type Response} from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { config } from "./utils/config.js";
import { handleCreateOrInstantiateWallet } from "./utils/handleCreateWallet.js";

/**Middlewares that runs before server endpoints are reached */
const app = express();

/** Allows the application use env */
dotenv.config({});
const serverPort = config.port || 3000;

app.use(helmet());
app.use(express.json());
app.use(cors());

app.get("/api/v1", (req: Request, res: Response) => {
    res.send("Welcome to liquid-staking-protocol API")
})

/** SERVER ARCHITECTURAL DESIGN
 * Create a new wallet or build one from seed when the server starts
 * Wait for funds
 * Join the deployed instance of the liquid staking contract
 * Start the server @param serverPort
 */
const connectionResult = await handleCreateOrInstantiateWallet();

if(connectionResult?.isConnected){
    app.listen(serverPort, () => {
        console.log(`Server Listening at http://localhost:${serverPort}`)
    })
}