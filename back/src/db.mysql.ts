import { Sequelize } from "sequelize";
import { mysqlPasswordUsers, mysqlUsernameUsers } from "./config";

console.log({ mysqlUsernameUsers, mysqlPasswordUsers });

//  It doesnt want to connect, use docker to use the database and be careful with the volumes
const sequelize = new Sequelize(
  "users",
  mysqlUsernameUsers,
  mysqlPasswordUsers,
  {
    host: "127.0.0.1",
    dialect: "mysql",
  }
);

export default sequelize;
