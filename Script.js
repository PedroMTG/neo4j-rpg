import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
  "neo4j+s://b0b555ea.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "PIlduKPLB2bzb6F6SIsEBEfCN8wjvZWUfJAAc_fMrXs")
);

async function populate() {
  try {

    let { records: r1, summary: s1 } = await driver.executeQuery(`
      CREATE (c:Char {nome: "Arthorius", lvl: 12, ouro: 320, xp: 1500, arma_atual: "Espada Longa"})
      CREATE (a:Arma {nome: "Espada Longa", dano: 25, lvl: 10, raridade: "Raro", preco: 150})
      CREATE (c)-[:PEGA]->(a)
    `, {}, { database: "neo4j" });

    console.log(`CREATE #1 -> OK`);

    let { summary: s2 } = await driver.executeQuery(`
      CREATE (c:Char {nome: "Lyra", lvl: 8, ouro: 120, xp: 780, arma_atual: "Arco de Caça"})
      CREATE (m:Mob {nome: "Goblin Guerreiro", lvl: 5, hp: 60, dano: 10, xp_recebido: 50})
      CREATE (c)-[:MATA]->(m)
    `, {}, { database: "neo4j" });

    console.log(`CREATE #2 -> OK`);

    let { summary: s3 } = await driver.executeQuery(`
      CREATE (c:Char {nome: "Darian", lvl: 6, ouro: 80, xp: 420, arma_atual: "Machado Enferrujado"})
      CREATE (i:Inventario {lote_total: 20, itens: "Poção de Cura, Poção de Mana", preenchido: 2, ouro: 80})
      CREATE (c)-[:ACESSA]->(i)
    `, {}, { database: "neo4j" });

    console.log(`CREATE #3 -> OK`);

    let { summary: s4 } = await driver.executeQuery(`
      CREATE (u:User {email: "teste123@email.com"})
      CREATE (c:Char {nome: "Ragnar", lvl: 15, ouro: 500, xp: 2100, arma_atual: "Machado de Guerra"})
      CREATE (u)-[:CRIA]->(c)
    `, {}, { database: "neo4j" });

    console.log(`CREATE #4 -> OK`);

    let { summary: s5 } = await driver.executeQuery(`
      CREATE (a:Arma {nome: "Adaga Sombria", dano: 15, lvl: 5, raridade: "Épico", preco: 300})
      CREATE (b:Bau {lote_total: 10, itens: "Adaga Sombria", preenchido: 1})
      CREATE (a)-[:GUARDADA_NO]->(b)
    `, {}, { database: "neo4j" });

    console.log(`CREATE #5 -> OK`);

    let { summary: s6 } = await driver.executeQuery(`
      CREATE (m:Mob {nome: "Esqueleto Arqueiro", hp: 40, dano: 12, lvl: 4, xp_recebido: 35})
      CREATE (a:Arma {nome: "Arco de Ossos", dano: 18, lvl: 4, raridade: "Comum", preco: 80})
      CREATE (m)-[:DROP]->(a)
    `, {}, { database: "neo4j" });

    console.log(`CREATE #6 -> OK`);

    let { summary: s7 } = await driver.executeQuery(`
      CREATE (m:Mob {nome: "Slime Verde", dano: 5, lvl: 2, hp: 30, xp_recebido: 15})
      CREATE (i:Item {nome: "Geléia Mística", raridade: "Comum", lvl: 1, preco: 5})
      CREATE (m)-[:DROP]->(i)
    `, {}, { database: "neo4j" });

    console.log(`CREATE #7 -> OK`);

    let { summary: s8 } = await driver.executeQuery(`
      CREATE (i:Item {nome: "Poção de Cura", raridade: "Comum", lvl: 1, preco: 20})
      CREATE (inv:Inventario {lote_total: 10, itens: "Poção de Cura", preenchido: 1, ouro: 50})
      CREATE (i)-[:GUARDADA_NO]->(inv)
    `, {}, { database: "neo4j" });

    console.log(`CREATE #8 -> OK`);

    let { summary: s9 } = await driver.executeQuery(`
      CREATE (i:Item {nome: "Elixir de Força", raridade: "Raro", lvl: 6, preco: 200})
      CREATE (c:Char {nome: "Mira", lvl: 9, ouro: 200, xp: 1100, arma_atual: "Faca Curvada"})
      CREATE (i)-[:RECEBE]->(c)
    `, {}, { database: "neo4j" });

    console.log(`CREATE #9 -> OK`);

    await driver.executeQuery(`MATCH (c:Char)-[:PEGA]->(a:Arma) RETURN c, a`);
    await driver.executeQuery(`MATCH (u:User)-[:CRIA]->(c:Char) RETURN u, c`);
    await driver.executeQuery(`MATCH (i:Item)-[:GUARDADA_NO]->(inv:Inventario) RETURN i, inv`);

    console.log("Populate completo!");

  } catch (err) {
    console.error("Erro ao popular:", err);
  } finally {
    await driver.close();
  }
}

populate();