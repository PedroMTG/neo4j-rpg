import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  // small local import so we don't need to change top-level imports

  const [active, setActive] = useState('User');

  const API = 'http://localhost:8082';

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [charNome, setCharNome] = useState('');
  const [charLvl, setCharLvl] = useState('');
  const [charOuro, setCharOuro] = useState('');
  const [charXp, setCharXp] = useState('');
  const [charArma, setCharArma] = useState('');
  const [itemNome, setItemNome] = useState('');
  const [itemPreco, setItemPreco] = useState('');
  const [itemRaridade, setItemRaridade] = useState('');
  const [invItens, setInvItens] = useState('');
  const [invLote, setInvLote] = useState('');
  const [invOuro, setInvOuro] = useState('');
  const [armaNome, setArmaNome] = useState('');
  const [armaLvl, setArmaLvl] = useState('');
  const [armaPreco, setArmaPreco] = useState('');
  const [armaDano, setArmaDano] = useState('');
  const [armaRaridade, setArmaRaridade] = useState('');
  const [bauLote, setBauLote] = useState('');
  const [bauItem, setBauItem] = useState('');

    const cadastrarUser = async () => {
      const body = { email, senha };
        await fetch(`${API}/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
    };

    const cadastrarChar = async () => {
      const body = {
        nome: charNome,
        lvl: charLvl,
        ouro: charOuro,
        xp: charXp,
        arma_atual: charArma
        };
        await fetch(`${API}/char`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
    };

    const cadastrarItem = async () => {
      const body = { nome: itemNome, preco: itemPreco, raridade: itemRaridade };
        await fetch(`${API}/item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
    };

    const cadastrarInventario = async () => {
      const body = {
        itens: invItens,
        lote_total: invLote,
        ouro: invOuro,
        preenchido: 0,
          };
          await fetch(`${API}/inventario`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
      });
    };

    const cadastrarArma = async () => {
      const body = {
        nome: armaNome,
        lvl: armaLvl,
        preco: armaPreco,
        dano: armaDano,
        raridade: armaRaridade
        };
        await fetch(`${API}/arma`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
    };

    const cadastrarBau = async () => {
      const body = { lote_total: bauLote, itens: bauItem }; 
        await fetch(`${API}/bau`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
    };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text onPress={() => setActive('User')} style={{...styles.botaoAba, marginHorizontal:6, fontWeight: active === 'User' ? '700' : '400', backgroundColor: active === 'User' ? '#b5c6ffff' : 'transparent',}}>Usuario</Text>
        <Text onPress={() => setActive('Char')} style={{...styles.botaoAba, marginHorizontal:6, fontWeight: active === 'Char' ? '700' : '400', backgroundColor: active === 'Char' ? '#b5c6ffff' : 'transparent',}}>Char</Text>
        <Text onPress={() => setActive('Item')} style={{...styles.botaoAba, marginHorizontal:6, fontWeight: active === 'Item' ? '700' : '400', backgroundColor: active === 'Item' ? '#b5c6ffff' : 'transparent',}}>Item</Text>
        <Text onPress={() => setActive('Inventario')} style={{...styles.botaoAba, marginHorizontal:6, fontWeight: active === 'Inventario' ? '700' : '400', backgroundColor: active === 'Inventario' ? '#b5c6ffff' : 'transparent',}}>Inventario</Text>
        <Text onPress={() => setActive('Arma')} style={{...styles.botaoAba, marginHorizontal:6, fontWeight: active === 'Arma' ? '700' : '400', backgroundColor: active === 'Arma' ? '#b5c6ffff' : 'transparent',}}>Arma</Text>
        <Text onPress={() => setActive('Bau')} style={{...styles.botaoAba, marginHorizontal:6, fontWeight: active === 'Bau' ? '700' : '400', backgroundColor: active === 'Bau' ? '#b5c6ffff' : 'transparent',}}>Bau</Text>
      </View>
      {active === 'User' && (
        <View style={styles.aba}>
          <Text style={styles.userText}>User</Text>
          <View>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry={true} />
            <Text style={styles.enviar} onPress={cadastrarUser}> Criar</Text>
          </View>
        </View>
      )}

      {active === 'Char' && (
        <View style={styles.aba}>
          <Text style={styles.userText}>Char</Text>
          <View>
            <TextInput style={styles.input} placeholder="Arma1" value={charArma} onChangeText={setCharArma} />
            <TextInput style={styles.input} placeholder="lvl" value={charLvl} onChangeText={setCharLvl} />
            <TextInput style={styles.input} placeholder="nome" value={charNome} onChangeText={setCharNome} />
            <TextInput style={styles.input} placeholder="ouro" value={charOuro} onChangeText={setCharOuro} />
            <TextInput style={styles.input} placeholder="xp" value={charXp} onChangeText={setCharXp} />
            <Text style={styles.enviar} onPress={cadastrarChar}> Criar</Text>
          </View>
        </View>
      )}

      {active === 'Item' && (
        <View style={styles.aba}>
          <Text style={styles.userText}>Item</Text>
          <View>
            <TextInput style={styles.input} placeholder="nome" value={itemNome} onChangeText={setItemNome} />
            <TextInput style={styles.input} placeholder="preco" value={itemPreco} onChangeText={setItemPreco} />
            <TextInput style={styles.input} placeholder="raridade" value={itemRaridade} onChangeText={setItemRaridade} />
            <Text style={styles.enviar} onPress={cadastrarItem}> Criar</Text>
          </View>
        </View>
      )}

      {active === 'Inventario' && (
        <View style={styles.aba}>
          <Text style={styles.userText}>Inventario</Text>
          <View>
            <TextInput style={styles.input} placeholder="itens" value={invItens} onChangeText={setInvItens} />
            <TextInput style={styles.input} placeholder="lote Total" value={invLote} onChangeText={setInvLote} />
            <TextInput style={styles.input} placeholder="ouro" value={invOuro} onChangeText={setInvOuro} />
            <Text style={styles.enviar} onPress={cadastrarInventario}> Criar</Text>
          </View>
        </View>
      )}

      {active === 'Arma' && (
        <View style={styles.aba}>
          <Text style={styles.userText}>Arma</Text>
          <View>
            <TextInput style={styles.input} placeholder="dano" value={armaDano} onChangeText={setArmaDano} />
            <TextInput style={styles.input} placeholder="lvl" value={armaLvl} onChangeText={setArmaLvl} />
            <TextInput style={styles.input} placeholder="nome" value={armaNome} onChangeText={setArmaNome} />
            <TextInput style={styles.input} placeholder="preço" value={armaPreco} onChangeText={setArmaPreco} />
            <TextInput style={styles.input} placeholder="raridade" value={armaRaridade} onChangeText={setArmaRaridade} />
            <Text style={styles.enviar} onPress={cadastrarArma}> Criar</Text>
          </View>
        </View>
      )}
      
      {active === 'Bau' && (
        <View style={styles.aba}>
          <Text style={styles.userText}>Bau</Text>
          <View>
            <TextInput style={styles.input} placeholder="lote Total" value={bauLote} onChangeText={setBauLote} />
            <TextInput style={styles.input} placeholder="Item" value={bauItem} onChangeText={setBauItem} />
            <Text style={styles.enviar} onPress={cadastrarBau}> Criar</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor: '#e20c0cff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  aba: {
    height: '70%',
    width: '70%',
    backgroundColor: '#9896c3ff',
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center',
  },
  userText:{
    fontSize: 30,
    fontFamily: 'Arial, Helvetica, sans-serif',
    marginBottom: 20,
  },
  input:{
    height: 30,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
  botaoAba:{
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enviar:{
    marginTop: 10,
    fontSize: 18,
    alignSelf: 'center',
    backgroundColor: '#4417afff',
    color: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
});
