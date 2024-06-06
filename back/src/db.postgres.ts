import { createClient } from "@supabase/supabase-js";

import { DB_URL, DB_ANON } from "./config";

import { Database } from "./types";

const supabase = createClient<Database>(DB_URL!, DB_ANON!);

export default supabase;
