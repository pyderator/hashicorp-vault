import { backendToken, Vault } from "../index";

var options: Vault.VaultOptions = {
  apiVersion: "v1",
  endpoint: "http://127.0.0.1:8200",
  token: `${backendToken}`,
};

let vault = Vault(options);

describe("Backend Class", () => {
  it("Should read secrets", async () => {
    const value = await vault.read("dev/data/integrations/01");
    expect(value.data.data.success).toBe("true");
  });

  it("Should be able to create a new secret", async () => {
    const value = await vault.write(
      `dev/data/integrations/${new Date().toString()}`,
      {
        data: {
          data: "RandomFandom",
        },
      }
    );
    expect(value.data.created_time).toBeDefined();
  });
});

afterAll((done) => done());
