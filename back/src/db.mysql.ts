import { Sequelize } from "sequelize";

import { mysqlSchema,mysqlUsername, mysqlPassword, mysqlHost } from "./config";

const conn = new Sequelize(mysqlSchema, mysqlUsername, mysqlPassword, {
  host: mysqlHost,
  dialect: "mysql",
});


export default conn