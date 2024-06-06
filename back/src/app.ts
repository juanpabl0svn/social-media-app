import app from "./index";

import { PORT } from "./config";

async function main() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error en base de datos", error);
  }
}

main();
