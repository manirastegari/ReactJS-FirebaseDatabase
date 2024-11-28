import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    fetch('https://api.coinlore.net/api/tickers/?start=0&limit=50')
      .then(response => response.json())
      .then(data => setCryptos(data.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: null,
      headerRight: () => (
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Auth' }],
              })
            );
          }}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={cryptos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('CryptoDetails', { cryptoId: item.id })}
          >
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemSymbol}>{item.symbol}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.exchangeButton}
        onPress={() => navigation.navigate('Favorites')}
      >
        <Text style={styles.exchangeButtonText}>MY EXCHANGE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemName: {
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemSymbol: {
    fontSize: 14,
    color: 'gray',
    marginTop: -5,
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'crimson',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  exchangeButton: {
    marginTop: 20,
    backgroundColor: 'crimson',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  exchangeButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});

export default HomeScreen;