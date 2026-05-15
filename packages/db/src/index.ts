import ws from "ws"
import { drizzle } from 'drizzle-orm/neon-serverless'
import { Pool, neonConfig } from "@neondatabase/serverless"

import * as schema from './schema'

neonConfig.webSocketConstructor = ws  // Required for Node.js environments
neonConfig.poolQueryViaFetch = true //  To work in edge environments like Cloudflare Workers

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });

export const db = drizzle({ client: pool, schema })
export type DB = typeof db
