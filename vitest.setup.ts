// Any setup scripts you might need go here

// Load .env files (.env.local takes precedence, matching Next.js)
import { config } from 'dotenv'

config({ path: ['.env.local', '.env'] })
