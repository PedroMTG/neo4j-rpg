var neo4j = require('neo4j-driver');
(async () => {
  const URI = 'neo4j+s://b0b555ea.databases.neo4j.io'
  const USER = 'neo4j'
  const PASSWORD = 'PIlduKPLB2bzb6F6SIsEBEfCN8wjvZWUfJAAc_fMrXs'
  let driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
  const serverInfo = await driver.getServerInfo()
  console.log('Connection established')
  console.log(serverInfo)


async function run() {

  // ---- LIMPAR BASE ----
  await driver.executeQuery(
    `MATCH (n) DETACH DELETE n`,
    {},
    { database: "neo4j" }
  );

  console.log("Base apagada.\n");

  // ---- INSERÇÕES (NO ESTILO DO SEU EXEMPLO) ----

  // Users
  await driver.executeQuery(`
    CREATE (:User {id:1, nome:"PlayerOne"})
  `);
  await driver.executeQuery(`
    CREATE (:User {id:2, nome:"PlayerTwo"})
  `);

  // Characters
  await driver.executeQuery(`
    CREATE (:Char {id:10, nome:"Guerreiro", nivel:12})
  `);
  await driver.executeQuery(`
    CREATE (:Char {id:11, nome:"Mago", nivel:8})
  `);
  await driver.executeQuery(`
    CREATE (:Char {id:12, nome:"Arqueira", nivel:15})
  `);

  // Items
  await driver.executeQuery(`
    CREATE (:Item {id:20, nome:"PocaoVida"})
  `);
  await driver.executeQuery(`
    CREATE (:Item {id:21, nome:"PocaoMana"})
  `);
  await driver.executeQuery(`
    CREATE (:Item {id:22, nome:"Flecha"})
  `);

  // Weapons
  await driver.executeQuery(`
    CREATE (:Arma {id:30, nome:"EspadaFerro", dano:15})
  `);
  await driver.executeQuery(`
    CREATE (:Arma {id:31, nome:"CajadoArcano", dano:22})
  `);

  // Bau
  await driver.executeQuery(`
    CREATE (:Bau {id:40, local:"Floresta"})
  `);
  await driver.executeQuery(`
    CREATE (:Bau {id:41, local:"Dungeon"})
  `);

  // Mobs
  await driver.executeQuery(`
    CREATE (:Mob {id:60, nome:"Slime", nivel:3})
  `);
  await driver.executeQuery(`
    CREATE (:Mob {id:61, nome:"Orc", nivel:9})
  `);
  await driver.executeQuery(`
    CREATE (:Mob {id:62, nome:"Dragao", nivel:30})
  `);


  // ---- RELACIONAMENTOS ----

  // User cria personagem
  await driver.executeQuery(`
    MATCH (u:User {id:1}), (c:Char {id:10})
    CREATE (u)-[:CRIA]->(c)
  `);

  await driver.executeQuery(`
    MATCH (u:User {id:2}), (c:Char {id:11})
    CREATE (u)-[:CRIA]->(c)
  `);

  // Personagem pega itens
  await driver.executeQuery(`
    MATCH (c:Char {id:10}), (i:Item {id:20})
    CREATE (c)-[:PEGA]->(i)
  `);

  await driver.executeQuery(`
    MATCH (c:Char {id:12}), (i:Item {id:22})
    CREATE (c)-[:PEGA]->(i)
  `);

  // Personagem pega arma
  await driver.executeQuery(`
    MATCH (c:Char {id:10}), (a:Arma {id:30})
    CREATE (c)-[:PEGA]->(a)
  `);

  // Arma guardada no bau
  await driver.executeQuery(`
    MATCH (a:Arma {id:31}), (b:Bau {id:41})
    CREATE (a)-[:GUARDADA_NO]->(b)
  `);

  // Personagem acessa bau
  await driver.executeQuery(`
    MATCH (c:Char {id:11}), (b:Bau {id:41})
    CREATE (c)-[:ACESSA]->(b)
  `);

  // Personagem mata mob
  await driver.executeQuery(`
    MATCH (c:Char {id:10}), (m:Mob {id:61})
    CREATE (c)-[:MATA]->(m)
  `);

  // Mob dropa item
  await driver.executeQuery(`
    MATCH (m:Mob {id:61}), (i:Item {id:20})
    CREATE (m)-[:DROP]->(i)
  `);

  // Personagem recebe item
  await driver.executeQuery(`
    MATCH (c:Char {id:11}), (i:Item {id:21})
    CREATE (c)-[:RECEBE]->(i)
  `);

  console.log("\nPovoamento concluído com sucesso!");

  await driver.close();
}

run();


  await driver.close()
})();