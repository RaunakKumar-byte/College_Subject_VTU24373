import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "RAUNAK@2005",
  database: "realtime_engine"
});

export default pool;