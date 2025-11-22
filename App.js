import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
const { useState } = require('react');

export default function App() {
  // small local import so we don't need to change top-level imports

  const [active, setActive] = useState('User');

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
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput style={styles.input} placeholder="Senha" />
          </View>
        </View>
      )}

      {active === 'Char' && (
        <View style={styles.aba}>
          <Text style={styles.userText}>Char</Text>
          <View>
            <TextInput style={styles.input} placeholder="Arma1" />
            <TextInput style={styles.input} placeholder="lvl" />
            <TextInput style={styles.input} placeholder="nome" />
            <TextInput style={styles.input} placeholder="ouro" />
            <TextInput style={styles.input} placeholder="xp" />
          </View>
        </View>
      )}

      {active === 'Item' && (
        <View style={styles.aba}>
          <Text style={styles.userText}>Item</Text>
          <View>
            <TextInput style={styles.input} placeholder="nome" />
            <TextInput style={styles.input} placeholder="preco" />
            <TextInput style={styles.input} placeholder="raridade" />
          </View>
        </View>
      )}

      {active === 'Inventario' && (
        <View style={styles.aba}>
          <Text style={styles.userText}>Inventario</Text>
          <View>
            <TextInput style={styles.input} placeholder="itens" />
            <TextInput style={styles.input} placeholder="lote Total" />
            <TextInput style={styles.input} placeholder="ouro" />
          </View>
        </View>
      )}

      {active === 'Arma' && (
        <View style={styles.aba}>
          <Text style={styles.userText}>Arma</Text>
          <View>
            <TextInput style={styles.input} placeholder="dano" />
            <TextInput style={styles.input} placeholder="lvl"/>
            <TextInput style={styles.input} placeholder="nome" />
            <TextInput style={styles.input} placeholder="preço" />
            <TextInput style={styles.input} placeholder="raridade" />
          </View>
        </View>
      )}
      
      {active === 'Bau' && (
        <View style={styles.aba}>
          <Text style={styles.userText}>Bau</Text>
          <View>
            <TextInput style={styles.input} placeholder="lote Total" />
            <TextInput style={styles.input} placeholder="Item" />
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
});
