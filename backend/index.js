const express = require("express");
const session = require("express-session");
const pool = require("./db.js");
const cors = require("cors");
let fs = require("fs");
const {
  getFullDate,
  createPassword,
  verifyPassword,
} = require("./functions.js");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:3001", // Permite solicitudes desde este origen
    credentials: true,
  }),
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// Middleware to parse JSON bodies - receive data from POST
app.use(express.json());

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    //res.redirect("/login");
    return res.status(401).send("Unauthorized");
  }
};

// GET
app.get("/tools", isAuthenticated, async (req, res) => {
  try {
    const q = await pool.query("SELECT * FROM tool ORDER BY ID asc;");
    return res.send(q.rows);
  } catch (err) {
    console.error("Error executing query", err.stack);
    return res.status(500).send("Error querying database");
  }
});

app.get("/transactions", isAuthenticated, async (req, res) => {
  try {
    const q = await pool.query(
      "SELECT transaction.id , tool.description, worker.name,  datetime, type as transaction FROM transaction INNER JOIN tool on transaction.tool_id = tool.id INNER JOIN worker on transaction.worker_id = worker.id"
    );
    return res.send(q.rows);
  } catch (err) {
    console.error("Error executing query", err.stack);
    return res.status(500).send("Error querying database");
  }
});

app.get("/workers", isAuthenticated, async (req, res) => {
  try {
    const q = await pool.query("SELECT * FROM worker ORDER BY ID asc;");
    return res.send(q.rows);
  } catch (err) {
    console.error("Error executing query", err.stack);
    return res.status(500).send("Error querying database");
  }
});

// GET by Barcode

app.get("/tools/barcode/:barcode", isAuthenticated, async (req, res) => {
  if (!req.params.barcode) {
    return res.status(400).send("Codigo de barras no enviado.");
  }

  try {
    const q = await pool.query("SELECT * FROM tool WHERE barcode = $1", [
      req.params.barcode,
    ]);
    if (q.rows.length === 0) {
      return res.status(404).send("Herramienta no encontrada.");
    }

    return res.send(q.rows);
  } catch (err) {
    console.error("Error executing query", err.stack);
    return res.status(500).send("Error querying database");
  }
});

// GET by ID

app.get("/tools/:id", isAuthenticated, async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Id de la herramienta no ha sido enviado");
  }

  try {
    const q = await pool.query("SELECT * FROM tool WHERE id = $1 LIMIT 1", [
      req.params.id,
    ]);

    if (q.rows.length === 0) {
      return res.status(404).send("Herramienta no encontrada.");
    }

    return res.send(q.rows);
  } catch (err) {
    console.error("Error executing query", err.stack);
    return res.status(500).send("Error querying database");
  }
});

app.get("/workers/:id", isAuthenticated, async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Id del trabajador no ha sido enviado");
  }

  try {
    const q = await pool.query("SELECT * FROM worker WHERE id = $1 LIMIT 1", [
      req.params.id,
    ]);

    if (q.rows.length === 0) {
      return res.status(404).send("Trabajador no encontrada.");
    }

    return res.send(q.rows);
  } catch (err) {
    console.error("Error executing query", err.stack);
    return res.status(500).send("Error querying database");
  }
});

// POST
app.post("/tools", isAuthenticated, async (req, res) => {
  const data = req.body;

  // 2024-08-02 09:00:00
  created_at = getFullDate();

  try {
    const q = await pool.query(
      "INSERT INTO tool VALUES (DEFAULT, $1, $2, $3, $4, $5)",
      [data.description, data.barcode, data.status, data.url_foto, created_at]
    );
  } catch (err) {
    console.error("Error executing query", err.stack);
    return res.status(500).send("Error querying database");
  }
  return res.status(200).send("Herramienta guardada con exito");
});

app.post("/workers", isAuthenticated, async (req, res) => {
  const data = req.body;

  try {
    const q = await pool.query("INSERT INTO worker VALUES (DEFAULT, $1, $2)", [
      data.name,
      data.area,
    ]);
  } catch (err) {
    console.error("Error executing query", err.stack);
    return res.status(500).send("Error querying database");
  }
  return res.status(200).send("trabajador guardado con exito");
});

app.post("/transactions", isAuthenticated, async (req, res) => {
  const data = req.body;

  // 2024-08-02 09:00:00
  created_at = getFullDate();

  try {
    const q = await pool.query(
      "INSERT INTO transaction VALUES (DEFAULT, $1, $2, $3, $4)",
      [data.tool_id, data.worker_id, created_at, data.type]
    );
  } catch (err) {
    console.error("Error executing query", err.stack);
    return res.status(500).send("Error querying database.");
  }
  return res.status(200).send("Transaccion guardada con exito");
});

// UPDATE

app.put("/tools/:id", isAuthenticated, async (req, res) => {
  const data = req.body;

  try {
    const q = await pool.query(
      "UPDATE tool SET description = $1, barcode = $2, status = $3, url_foto = $4 WHERE id = $5",
      [
        data.description,
        data.barcode,
        data.status,
        data.url_foto,
        req.params.id,
      ]
    );
    return res
      .status(200)
      .send("Se ha actualizado la herramienta correctamente");
  } catch (err) {
    console.error("Error executing query", err.stack);
    return res.status(500).send("Error querying database.");
  }
});

app.put("/workers/:id", isAuthenticated, async (req, res) => {
  const data = req.body;

  try {
    const q = await pool.query(
      "UPDATE worker SET name = $1, area = $2 WHERE id = $3",
      [data.Name, data.Area, req.params.id]
    );
    return res
      .status(200)
      .send("Se ha actualizado el trabajador correctamente");
  } catch (err) {
    console.error("Error executing query", err.stack);
    return res.status(500).send("Error querying database.");
  }
});

// DELETE
app.delete("/tools/:id", isAuthenticated, async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Id de la herramienta no ha sido enviado.");
  }

  try {
    // Realiza la consulta para eliminar el registro correspondiente al `id`.
    const result = await pool.query("DELETE FROM tool WHERE id = $1", [
      req.params.id,
    ]);

    // Responde con un mensaje de éxito y el registro eliminado.
    return res
      .status(200)
      .send(`Registro eliminado: ${JSON.stringify(result.rows[0])}`);
  } catch (err) {
    // Maneja errores de la consulta.
    console.error("Error executing query", err.stack);
    return res.status(500).send("Error querying database.");
  }
});

app.delete("/workers/:id", isAuthenticated, async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Id del trabajador no ha sido enviado.");
  }

  try {
    // Realiza la consulta para eliminar el registro correspondiente al `id`.
    const result = await pool.query("DELETE FROM worker WHERE id = $1", [
      req.params.id,
    ]);

    // Responde con un mensaje de éxito y el registro eliminado.
    return res
      .status(200)
      .send(`Registro eliminado: ${JSON.stringify(result.rows[0])}`);
  } catch (err) {
    // Maneja errores de la consulta.
    console.error("Error executing query", err.stack);
    return res.status(500).send("Error querying database.");
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  const data = req.body;

  try {
    const q = await pool.query(
      "SELECT username, password, status FROM users WHERE username = $1 LIMIT 1",
      [data.username]
    );

    if (q.rowCount == 0) {
      return res.status(400).send("Invalid user or password.");
    }

    user = q.rows[0];

    if (user.status != "A") {
      return res.status(400).send("Usuario inactivo.");
    }

    if (await verifyPassword(data.password, user.password)) {
      // Store user data in the session
      req.session.user = data.username;

      res.cookie("sessionId", req.sessionID, {
        maxAge: 604800000,
        //httpOnly: true,
      });
      //res.redirect("/profile");

      return res.status(200).send(`Login successfully!`);
    } else {
      return res.status(400).send("Invalid user or password.");
    }
  } catch (err) {
    console.error("Error executing query", err.stack);
    return res.status(500).send("Error querying database");
  }
});

app.post("/createpassword", async (req, res) => {
  const data = req.body;

  const hash = await createPassword(data.password);
  return res.status(200).send(`Hash: ${hash}`);
});

/*
  tools.js
  workers.js
  user.js (perfil, cambiar contraseña, login)
*/
