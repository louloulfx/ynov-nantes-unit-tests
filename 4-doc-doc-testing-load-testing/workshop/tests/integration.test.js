const mongoose = require('mongoose');
const ToDo = require('../toDoModel').ToDo;

beforeAll(async () => {
    await mongoose
        .connect("mongodb://mongo:27017/toDoApp", {
            useNewUrlParser: true,
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

    await ToDo.deleteMany({}, (err) => {
        if (err) console.log(`error: ${err}`);
    });

    const todo = await ToDo.find({}, (err, docs) => {
        if (err) console.log(`error: ${err}`);
        else return docs;
    });

    expect(todo.length).toBe(0);
})

it("Create Todo", async () => {
    const todoText = "Test todo";

    const newTodo = new ToDo({
        text: todoText
    });

    await newTodo.save();

    const todo = await ToDo.find({}, (err, docs) => {
        if (err) console.log(`error: ${err}`);
        else return docs;
    });

    expect(todo.length).toBe(1);
    expect(todo[0].text).toBe(todoText);
})

it("Update Todo", async () => {
    await ToDo.deleteMany({}, (err) => {
        if (err) console.log(`error: ${err}`);
    });
    const todoText = "Test todo";
    const updatedTodoText = "Updated test todo";

    const newTodo = new ToDo({
        text: todoText
    });

    await newTodo.save();

    await ToDo.updateOne({ text: todoText }, { text: updatedTodoText }, (err) => {
        if (err) console.log(`error: ${err}`);
    });

    const todo = await ToDo.find({}, (err, docs) => {
        if (err) console.log(`error: ${err}`);
        else return docs;
    });

    expect(todo.length).toBe(1);
    expect(todo[0].text).toBe(updatedTodoText);
})

