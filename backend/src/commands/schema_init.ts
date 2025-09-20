import fs from 'fs';
import {query} from "../models/database.js";

const schemaPath = process.env.DB_SCHEMA_PATH
    || process.cwd().slice(0, process.cwd().lastIndexOf('/')) + '/database/init.sql';

const data = fs.readFileSync(schemaPath, 'utf-8');

try {
    await query(data);
} catch (err) {
    console.error(err);
}
