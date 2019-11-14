const db = require("../data/dbConfig.js");

const { insert } = require("./hobbitsModel.js");

describe("hobbits model", function() {
  describe("insert()", function() {
    beforeEach(async () => {
      await db("hobbits").truncate();
    });

    it("should insert a hobbit", async function() {
      // insert a hobbit into the db
      await insert({ name: "sam" });

      // check if it was inserted into the db
      const hobbits = await db("hobbits"); // read from db directly
      expect(hobbits).toHaveLength(1); // at least we know one record was inserted
    });

    it("should insert the provided hobbit", async function() {
      await insert({ name: "sam" });
      await insert({ name: "gaffer" });

      const hobbits = await db("hobbits"); // read from db directly

      expect(hobbits).toHaveLength(2); // both records are there
      expect(hobbits[0].name).toBe("sam"); // the first record is sam
      expect(hobbits[1].name).toBe("gaffer"); // the second record is gaffer
    });

    it("should return the inserted hobbit", async function() {
      let hobbit = await insert({ name: "sam" });
      expect(hobbit.name).toBe("sam");
      expect(hobbit.id).toBeDefined(); // now I know it's coming from the db

      hobbit = await insert({ name: "gaffer" });
      expect(hobbit.name).toBe("gaffer");
      expect(hobbit.id).toBeDefined();
    });
  });
});
