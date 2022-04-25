import { Vault, workerToken } from "../index";

var options: Vault.VaultOptions = {
  apiVersion: "v1",
  endpoint: "http://127.0.0.1:8200",
  token: `${workerToken}`,
};

let vault = Vault(options);

describe("Worker Class", () => {
  it("Should read secrets", async () => {
    const value = await vault.read("dev/data/integrations/01");
    expect(value.data.data.success).toBe("true");
  });

  it("Should not write to secret", async () => {
    try {
      await vault.write("dev/data/integrations/02", {
        data: {
          data: "RandomFandom",
        },
      });
    } catch (error: any) {
      expect(error.response.statusCode).toBe(403);
    }
  });
});

afterAll((done) => done());
