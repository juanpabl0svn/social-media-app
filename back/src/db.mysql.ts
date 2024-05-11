import { Sequelize, DataTypes } from "sequelize";

import { mysqlSchema, mysqlUsername, mysqlPassword, mysqlHost } from "./config";

export const sequelize = new Sequelize(
  mysqlSchema,
  mysqlUsername,
  mysqlPassword,
  {
    host: mysqlHost,
    dialect: "mysql",
    define: {
      timestamps: false,
    },
  }
);

export const User = sequelize.define(
  "users",
  {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    followers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",
  }
);

export const Post = sequelize.define(
  "posts",
  {
    id_post: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id_user",
      },
    },
    imageSrc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desciption:{
      type: DataTypes.STRING,
      allowNull:true
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "posts",
  }
);