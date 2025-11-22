import express from "express";
import neo4j from "neo4j-driver";
import cors from "cors";

const app = express();
app.use(express.json());

const driver = neo4j.driver(
  "neo4j+s://b0b555ea.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "PIlduKPLB2bzb6F6SIsEBEfCN8wjvZWUfJAAc_fMrXs")
);

app.use(
  cors({
    origin: "http://localhost:8081", // Permite a comunicação com o React
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.listen(8082, () => console.log("API rodando na porta 8082"));

// CADASTROS 
// POST /user
app.post("/user", async (req, res) => {
  const { email, senha } = req.body;

  try {
    let { summary } = await driver.executeQuery(
      `CREATE (u:User {email: $email, senha: $senha})`,
      { email, senha },
      { database: "neo4j" }
    );

    res.json({ msg: "User criado", nodes: summary.counters.updates() });
  } catch (e) {
    res.status(500).json({ erro: e });
  }
});

// POST /char
app.post("/char", async (req, res) => {
  const { nome, lvl, ouro, xp, arma_atual } = req.body;

  try {
    let { summary } = await driver.executeQuery(
      `CREATE (c:Char {nome: $nome, lvl: $lvl, ouro: $ouro, xp: $xp, arma_atual: $arma_atual})`,
      { nome, lvl, ouro, xp, arma_atual },
      { database: "neo4j" }
    );

    res.json({ msg: "Char criado", nodes: summary.counters.updates() });
  } catch (e) {
    res.status(500).json({ erro: e });
  }
});

// POST /arma
app.post("/arma", async (req, res) => {
  const { nome, lvl, dano, preco, raridade } = req.body;

  try {
    let { summary } = await driver.executeQuery(
      `CREATE (a:Arma {nome: $nome, lvl: $lvl, dano: $dano, preco: $preco, raridade: $raridade})`,
      { nome, lvl, dano, preco, raridade },
      { database: "neo4j" }
    );

    res.json({ msg: "Arma criada", nodes: summary.counters.updates() });
  } catch (e) {
    res.status(500).json({ erro: e });
  }
});

// POST /item
app.post("/item", async (req, res) => {
  const { nome, preco, raridade } = req.body;
  try {
    let { summary } = await driver.executeQuery(
      `CREATE (i:Item {nome: $nome, preco: $preco, raridade: $raridade})`,
      { nome, preco, raridade },
      { database: "neo4j" }
    );

    res.json({ msg: "Item criado", nodes: summary.counters.updates() });
  } catch (e) {
    res.status(500).json({ erro: e });
  }
});

// POST /inventario
app.post("/inventario", async (req, res) => {
  const { lote_total, itens, preenchido, ouro } = req.body;
    try {
        let { summary } = await driver.executeQuery(
        `CREATE (inv:Inventario {lote_total: $lote_total, itens: $itens, preenchido: $preenchido, ouro: $ouro})`,
        { lote_total, itens, preenchido, ouro },
        { database: "neo4j" }
        );

        res.json({ msg: "Inventario criado", nodes: summary.counters.updates() });
    } catch (e) {
        res.status(500).json({ erro: e });
    }
});

// POST /bau
app.post("/bau", async (req, res) => {
const { lote_total, itens } = req.body; 
    try {
        let { summary } = await driver.executeQuery(
        `CREATE (b:Bau {lote_total: $lote_total, itens: $itens})`,
        {lote_total, itens },
        { database: "neo4j" }
        );

        res.json({ msg: "Bau criado", nodes: summary.counters.updates() });
        } catch (e) {
        res.status(500).json({ erro: e });
    }
});

// POST /mob
app.post("/mob", async (req, res) => {
  const { nome, dano, lvl, hp, xp_recebido } = req.body;
    try {
        let { summary } = await driver.executeQuery(
        `CREATE (m:Mob {nome: $nome, dano: $dano, lvl: $lvl, hp: $hp, xp_recebido: $xp_recebido})`,
        { nome, dano, lvl, hp, xp_recebido },
        { database: "neo4j" }
        );

        res.json({ msg: "Mob criado", nodes: summary.counters.updates() });
    } catch (e) {
        res.status(500).json({ erro: e });
    }
});

// RELAÇÕES 
// POST /user/:userId/cria/:charId
app.post("/user/:uid/cria/:cid", async (req, res) => {
  try {
    let { summary } = await driver.executeQuery(
      `
      MATCH (u:User), (c:Char)
      WHERE ID(u) = $uid AND ID(c) = $cid
      CREATE (u)-[:CRIA]->(c)
      `,
      { uid: Number(req.params.uid), cid: Number(req.params.cid) },
      { database: "neo4j" }
    );

    res.json({ msg: "Relação CRIA criada!", summary });
  } catch (e) {
    res.status(500).json({ erro: e });
  }
});

// POST /char/:cid/pega/:armaId
app.post("/char/:cid/pega/:aid", async (req, res) => {
  try {
    let { summary } = await driver.executeQuery(
      `
      MATCH (c:Char), (a:Arma)
      WHERE ID(c) = $cid AND ID(a) = $aid
      CREATE (c)-[:PEGA]->(a)
      `,
      { cid: Number(req.params.cid), aid: Number(req.params.aid) },
      { database: "neo4j" }
    );

    res.json({ msg: "Relação PEGA criada!", summary });
  } catch (e) {
    res.status(500).json({ erro: e });
  }
});

// POST /char/:cid/mata/:mobId
app.post("/char/:cid/mata/:mid", async (req, res) => {
  try {
    let { summary } = await driver.executeQuery(
      `
      MATCH (c:Char), (m:Mob)
      WHERE ID(c) = $cid AND ID(m) = $mid
      CREATE (c)-[:MATA]->(m)
      `,
      { cid: Number(req.params.cid), mid: Number(req.params.mid) },
      { database: "neo4j" }
    );

    res.json({ msg: "Relação MATA criada!", summary });
  } catch (e) {
    res.status(500).json({ erro: e });
  }
});

// POST /mob/:mid/drop/arma/:aid
app.post("/mob/:mid/drop/arma/:aid", async (req, res) => {
  try {
    let { summary } = await driver.executeQuery(
      `
      MATCH (m:Mob), (a:Arma)
      WHERE ID(m) = $mid AND ID(a) = $aid
      CREATE (m)-[:DROP]->(a)
      `,
      { mid: Number(req.params.mid), aid: Number(req.params.aid) },
      { database: "neo4j" }
    );

    res.json({ msg: "Mob DROP Arma criado!", summary });
  } catch (e) {
    res.status(500).json({ erro: e });
  }
});

// POST /mob/:mid/drop/item/:iid
app.post("/mob/:mid/drop/item/:iid", async (req, res) => {
  try {
    let { summary } = await driver.executeQuery(
      `
      MATCH (m:Mob), (i:Item)
      WHERE ID(m) = $mid AND ID(i) = $iid
      CREATE (m)-[:DROP]->(i)
      `,
      { mid: Number(req.params.mid), iid: Number(req.params.iid) },
      { database: "neo4j" }
    );

    res.json({ msg: "Mob DROP Item criado!", summary });
  } catch (e) {
    res.status(500).json({ erro: e });
  }
});

// POST /item/:iid/guardado/inventario/:invId
app.post("/item/:iid/guardado/inv/:invId", async (req, res) => {
  try {
    let { summary } = await driver.executeQuery(
      `
      MATCH (i:Item), (inv:Inventario)
      WHERE ID(i) = $iid AND ID(inv) = $invId
      CREATE (i)-[:GUARDADA_NO]->(inv)
      `,
      { iid: Number(req.params.iid), invId: Number(req.params.invId) },
      { database: "neo4j" }
    );

    res.json({ msg: "Item guardado no inventário!", summary });
  } catch (e) {
    res.status(500).json({ erro: e });
  }
});

// POST /arma/:aid/guardado/bau/:bid
app.post("/arma/:aid/guardado/bau/:bid", async (req, res) => {
  try {
    let { summary } = await driver.executeQuery(
      `
      MATCH (a:Arma), (b:Bau)
      WHERE ID(a) = $aid AND ID(b) = $bid
      CREATE (a)-[:GUARDADA_NO]->(b)
      `,
      { aid: Number(req.params.aid), bid: Number(req.params.bid) },
      { database: "neo4j" }
    );

    res.json({ msg: "Arma guardada no bau!", summary });
  } catch (e) {
    res.status(500).json({ erro: e });
  }
});

// POST /char/:cid/acessa/:invId
app.post("/char/:cid/acessa/:invId", async (req, res) => {
  try {
    let { summary } = await driver.executeQuery(
      `
      MATCH (c:Char), (inv:Inventario)
      WHERE ID(c) = $cid AND ID(inv) = $invId
      CREATE (c)-[:ACESSA]->(inv)
      `,
      { cid: Number(req.params.cid), invId: Number(req.params.invId) },
      { database: "neo4j" }
    );

    res.json({ msg: "Char acessou inventário!", summary });
  } catch (e) {
    res.status(500).json({ erro: e });
  }
});



