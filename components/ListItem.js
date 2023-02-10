import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'

const ListItem = ({ name, symbol, currentPrice, priceChange, logoUrl, onPress }) => {
    const priceChangeColor = priceChange > 0 ? '#34C759' : '#FF3B30';
  
    return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemWrapper}>
        <View style={styles.left}>
            <Image source={{ uri: logoUrl }} style={styles.image}/>
            <View style={styles.titlesWrapper}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.subtitle}>{symbol.toUpperCase()}</Text>
            </View>
        </View>

        <View style={styles.right}>
            <Text style={styles.title}>${currentPrice.toLocaleString('en-US', { currency: 'USD' })}</Text>
            <Text style={[styles.subtitle, {color: priceChangeColor}]}>{priceChange.toFixed(2)}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    right: {
        alignItems: 'flex-end',
    }, 
    itemWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginTop: 24,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        height: 48,
        width: 48,
    },
    titlesWrapper: {
        marginLeft: 8,
    },
    title: {
        fontSize: 18,
    },
    subtitle: {
        marginTop: 4,
        fontSize: 14,
        color: "#A9ABB1"
    },
})

export default ListItem