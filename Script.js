const populate = async () => {
  try {
    const URI = 'neo4j+s://b0b555ea.databases.neo4j.io'
    const USER = 'neo4j'
    const PASSWORD = 'PIlduKPLB2bzb6F6SIsEBEfCN8wjvZWUfJAAc_fMrXs'
    let driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
    const serverInfo = await driver.getServerInfo()
    console.log('Connection established')
    console.log(serverInfo)

    let { records: r1, summary: s1 } = await driver.executeQuery(`
      CREATE (c:Char {arma_atual: "", lvl: "", ouro: "", xp: "", nome: ""})
      CREATE (a:Arma {preco: 0, dano: 0, lvl: "", raridade: "", nome: ""})
      CREATE (c)-[:PEGA]->(a)
    `, {}, { database: "neo4j" });

    console.log(
      `CREATE #1 -> ${s1.counters.updates().nodesCreated} nodes em ${s1.resultAvailableAfter} ms.`
    );


    
    let { records: r2, summary: s2 } = await driver.executeQuery(`
      CREATE (c:Char {arma_atual: "", lvl: "", ouro: "", xp: "", nome: ""})
      CREATE (m:Mob {dano: 0, lvl: 0, hp: 0, nome: "", xp_recebido: 0})
      CREATE (c)-[:MATA]->(m)
    `, {}, { database: "neo4j" });

    console.log(
      `CREATE #2 -> ${s2.counters.updates().nodesCreated} nodes em ${s2.resultAvailableAfter} ms.`
    );


  
    let { records: r3, summary: s3 } = await driver.executeQuery(`
      CREATE (c:Char {arma_atual: "", lvl: "", ouro: "", xp: "", nome: ""})
      CREATE (i:Inventario {lote_total: 0, itens: "", preenchido: 0, ouro: 0})
      CREATE (c)-[:ACESSA]->(i)
    `, {}, { database: "neo4j" });

    console.log(
      `CREATE #3 -> ${s3.counters.updates().nodesCreated} nodes em ${s3.resultAvailableAfter} ms.`
    );

 

    let { records: r4, summary: s4 } = await driver.executeQuery(`
      CREATE (u:User {senha: "", email: ""})
      CREATE (c:Char {arma_atual: "", lvl: "", ouro: "", xp: "", nome: ""})
      CREATE (u)-[:CRIA]->(c)
    `, {}, { database: "neo4j" });

    console.log(
      `CREATE #4 -> ${s4.counters.updates().nodesCreated} nodes em ${s4.resultAvailableAfter} ms.`
    );


    
    let { records: r5, summary: s5 } = await driver.executeQuery(`
      CREATE (a:Arma {preco: 0, dano: 0, lvl: "", raridade: "", nome: ""})
      CREATE (b:Bau {lote_total: 0, itens: "", preenchido: 0})
      CREATE (a)-[:GUARDADA_NO]->(b)
    `, {}, { database: "neo4j" });

    console.log(
      `CREATE #5 -> ${s5.counters.updates().nodesCreated} nodes em ${s5.resultAvailableAfter} ms.`
    );


    
    let { records: r6, summary: s6 } = await driver.executeQuery(`
      CREATE (m:Mob {dano: 0, lvl: 0, hp: 0, nome: "", xp_recebido: 0})
      CREATE (a:Arma {preco: 0, dano: 0, lvl: "", raridade: "", nome: ""})
      CREATE (m)-[:DROP]->(a)
    `, {}, { database: "neo4j" });

    console.log(
      `CREATE #6 -> ${s6.counters.updates().nodesCreated} nodes em ${s6.resultAvailableAfter} ms.`
    );

    

    let { records: r7, summary: s7 } = await driver.executeQuery(`
      CREATE (m:Mob {dano: 0, lvl: 0, hp: 0, nome: "", xp_recebido: 0})
      CREATE (i:Item {preco: 0, lvl: "", raridade: "", nome: ""})
      CREATE (m)-[:DROP]->(i)
    `, {}, { database: "neo4j" });

    console.log(
      `CREATE #7 -> ${s7.counters.updates().nodesCreated} nodes em ${s7.resultAvailableAfter} ms.`
    );

    

    let { records: r8, summary: s8 } = await driver.executeQuery(`
      CREATE (i:Item {preco: 0, lvl: "", raridade: "", nome: ""})
      CREATE (inv:Inventario {lote_total: 0, itens: "", preenchido: 0, ouro: 0})
      CREATE (i)-[:GUARDADA_NO]->(inv)
    `, {}, { database: "neo4j" });

    console.log(
      `CREATE #8 -> ${s8.counters.updates().nodesCreated} nodes em ${s8.resultAvailableAfter} ms.`
    );

    

    let { records: r9, summary: s9 } = await driver.executeQuery(`
      CREATE (i:Item {preco: 0, lvl: "", raridade: "", nome: ""})
      CREATE (c:Char {arma_atual: "", lvl: "", ouro: "", xp: "", nome: ""})
      CREATE (i)-[:RECEBE]->(c)
    `, {}, { database: "neo4j" });

    console.log(
      `CREATE #9 -> ${s9.counters.updates().nodesCreated} nodes em ${s9.resultAvailableAfter} ms.`
    );



    // RELACIONAMENTOS


    
    let { records: m1, summary: sm1 } = await driver.executeQuery(`
      MATCH (c:Char)-[:PEGA]->(a:Arma)
      RETURN c, a
    `, {}, { database: "neo4j" });

    console.log(
      `MATCH #1 -> ${m1.length} linhas em ${sm1.resultAvailableAfter} ms.`
    );

 

    let { records: m2, summary: sm2 } = await driver.executeQuery(`
      MATCH (u:User)-[:CRIA]->(c:Char)
      RETURN u.email AS email, c.nome AS char
    `, {}, { database: "neo4j" });

    console.log(
      `MATCH #2 -> ${m2.length} linhas em ${sm2.resultAvailableAfter} ms.`
    );


    
    let { records: m3, summary: sm3 } = await driver.executeQuery(`
      MATCH (i:Item)-[:GUARDADA_NO]->(inv:Inventario)
      RETURN i.nome AS item, inv.lote_total AS lotes
    `, {}, { database: "neo4j" });

    console.log(
      `MATCH #3 -> ${m3.length} linhas em ${sm3.resultAvailableAfter} ms.`
    );

    console.log("Populate completo!");

  } catch (err) {
    console.error("Erro ao popular:", err);
  } finally {
    await driver.close();
  }
}

populate();