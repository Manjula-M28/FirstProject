const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

let todos = [];

// Home page with design
app.get("/", (req, res) => {
  let list = todos.map((t, i) => `
    <li>
      ${t}
      <a href="/delete/${i}">❌</a>
    </li>
  `).join("");

  res.send(`
  <html>
  <head>
    <title>Todo App</title>
    <style>
      body {
        font-family: Arial;
        background: linear-gradient(to right, #4facfe, #00f2fe);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      .box {
        background: white;
        padding: 20px;
        border-radius: 10px;
        width: 350px;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
      }
      h2 {
        text-align: center;
      }
      input {
        width: 75%;
        padding: 8px;
      }
      button {
        padding: 8px;
        background: green;
        color: white;
        border: none;
        cursor: pointer;
      }
      ul {
        list-style: none;
        padding: 0;
      }
      li {
        background: #eee;
        margin: 5px 0;
        padding: 8px;
        display: flex;
        justify-content: space-between;
        border-radius: 5px;
      }
      a {
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <h2>📝 Todo App</h2>
      <form action="/add" method="POST">
        <input type="text" name="task" placeholder="Enter task" required />
        <button>Add</button>
      </form>
      <ul>
        ${list}
      </ul>
    </div>
  </body>
  </html>
  `);
});

// Add todo
app.post("/add", (req, res) => {
  todos.push(req.body.task);
  res.redirect("/");
});

// Delete todo
app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  todos.splice(id, 1);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Todo App running on http://localhost:3000");
});
