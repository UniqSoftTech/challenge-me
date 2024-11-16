import dotenv from "dotenv";
dotenv.config();

export const auth_key = process.env.AUTH_KEY as string;
export const private_key = process.env.PRIVATE_KEY as string;
export const json_rpc_url = process.env.JSON_RPC_URL as string;
export const contract_address = process.env.CONTRACT_ADDRESS as string;