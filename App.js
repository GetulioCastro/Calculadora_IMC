import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { TextInput, Button } from 'react-native-paper';

export default class App extends React.Component {
  // valores globais do app
  state = {
    peso: 0,
    altura: 0,
    imc: 0,
    diagnostico: 'Indeterminado',
    cor: '#bdc3c7'
  };

  calcularIMC = () => {
    const resultado = this.state.peso / (this.state.altura * this.state.altura);

    this.setState({
      imc: Math.ceil(resultado)
    });
    if(resultado < 18.5) {
      this.setState({
        diagnostico: 'Magreza',
        cor: '#f1c40f'
      });
    } else if (resultado >= 18.5 && resultado < 25) {
      this.setState({
        diagnostico: 'Normal',
        cor: '#1abc9c'
      });
    } else if (resultado >= 25 && resultado < 30) {
      this.setState({
        diagnostico: 'Sobrepeso',
        cor: '#e67e22'
      });
    } else if (resultado >= 30 && resultado < 40) {
      this.setState({
        diagnostico: 'Obesidade',
        cor: '#d35400'
      });
    } else if (resultado >= 40) {
      this.setState({
        diagnostico: 'Obesidade Mórbida',
        cor: '#c0392b'
      });
    }
  }

  render() {
    return (
       <View style={styles.app}>
        <Text style={styles.cabecalho}>Seu IMC</Text>

        <View style={[styles.painel, {backgroundColor: this.state.cor}]}>

          <Text style={styles.legenda}>{this.state.imc}</Text>
          <Text style={styles.diagnostico}>{this.state.diagnostico}</Text>

        </View>

        <View>

          <TextInput
           style={styles.peso}
           label='Peso'
           onChangeText={ valor => {
             this.setState({peso: valor.replace(',', '.')});
           }}
          />

          <TextInput
           style={styles.altura} 
           label='Altura'
           onChangeText={valor => {
             this.setState({altura: valor.replace(',', '.')});
           }}
          />

          <Button mode='contained' onPress={this.calcularIMC}>
            Calcular seu IMC
          </Button>

        </View>
       </View>
 
    );
  }
}

const styles = StyleSheet.create({
  app: {
    padding: 35,
  },
  painel: {
    borderRadius: 5,
    marginVertical: 15,
    padding: 8,
    width: 125,
    alignSelf: 'center',
  },
  cabecalho: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  legenda: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
  },
  diagnostico: {
    textAlign: 'center',
    fontSize: 16,
  },
  peso: {
    borderRadius: 10,
    marginVertical: 10,
  },
  altura: {
    borderRadius: 10,
    marginVertical: 10,
  },
});
