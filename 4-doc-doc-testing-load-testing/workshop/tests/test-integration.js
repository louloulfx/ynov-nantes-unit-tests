const mongoose = require('mongoose');
const ToDo = require('../toDoModel');

beforeAll(async () => {
    await mongoose
        .connect("mongodb://mongo:27017/toDoApp", {
            useNewUrlParser: true,
            useFindAndModify: false,
        })
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch(err => {
            console.log("Could not connect to MongoDB");
            console.error(err);
        });
});

it("Delete Todo", async () => {
    const todoText = "Test todo";

    const newTodo = new ToDo({
        text: todoText
    });

    await newTodo.save();

    await ToDo.findOneAndDelete({
        text: todoText
    });

    const todo = await ToDo.findOne({
        text: todoText
    });

    expect(todo).toBe(null);
})

