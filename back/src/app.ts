import app from "./index";
import { sequelize } from "./db.mysql";
// import { firebase } from "./db.firebase";
import { PORT } from "./config";

async function main() {
  try {
    await sequelize.sync();

    // await firebase check if it connects

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error en base de datos", error);
  }
}

main();
