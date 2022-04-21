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

it("Delete Items", async () => {
    const itemName1 = String("Toto");

    const newItem1 = new Item({ name: itemName1 });
    await newItem1.save();

    const itemName2 = String("Tata");

    const newItem2 = new Item({ name: itemName2 });
    await newItem2.save();

    await Item.deleteMany({}, (err) => {
        if (err) console.log(`error: ${err}`);
    });

    const items = await Item.find({}, (err, docs) => {
        if (err) console.log(`error: ${err}`);
        else return docs;
    });
    expect(items.length).toBe(0);
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
