const mongoose = require("mongoose");
const Item = require("./Item");

beforeAll(async () => {
    await mongoose
        .connect("mongodb://mongo:27017/docker-node-mongo", {
            useNewUrlParser: true,
        })
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.log(err));
});

it("Create Item", async () => {
    const itemName = String("Toto");

    const newItem = new Item({ name: itemName });
    await newItem.save();

    const items = await Item.find({ name: { $eq: itemName } }, (err, docs) => {
        if (err) console.log(`error: ${err}`);
        else return docs;
    });
    expect(items.length).toBe(1);
    expect(items[0].name).toBe(itemName);
    expect(items[0].date).not.toBe(undefined);
});
