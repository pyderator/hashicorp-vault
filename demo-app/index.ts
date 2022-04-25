import * as fs from "fs";
import Vault from "node-vault";

const workerPath = "../vault/worker/appToken";
const backendPath = "../vault/backend/appToken";

let workerToken = fs.readFileSync(workerPath).toString();
let backendToken = fs.readFileSync(backendPath).toString();

fs.watchFile(workerPath, { interval: 100, persistent: true }, function () {
  workerToken = fs.readFileSync(workerPath).toString();
  console.log(workerToken);
});

fs.watchFile(backendPath, { interval: 100, persistent: true }, function () {
  backendToken = fs.readFileSync(backendPath).toString();
  console.log(backendToken);
});

var options: Vault.VaultOptions = {
  apiVersion: "v1",
  endpoint: "http://127.0.0.1:8200", // Edit this as per config
  token: `${workerToken}`,
};

const vault = Vault(options);

export { backendToken, workerToken, vault, Vault };
