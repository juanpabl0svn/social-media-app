import app from "./index";

// import conn from "./db.mysql";// import { firebase } from "./db.firebase";
import { PORT } from "./config";

async function main() {
  try {

    // await conn.authenticate(); // await sequelize check if it connects


    // await firebase check if it connects

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error en base de datos", error);
  }
}

main();
