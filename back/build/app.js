"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const config_1 = require("./config");
async function main() {
    try {
        index_1.default.listen(config_1.PORT, () => {
            console.log(`Server is running on port ${config_1.PORT}`);
        });
    }
    catch (error) {
        console.log("Error en base de datos", error);
    }
}
main();
