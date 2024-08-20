"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const config_1 = require("./config");
const supabase = (0, supabase_js_1.createClient)(config_1.DB_URL, config_1.DB_ANON);
exports.default = supabase;
