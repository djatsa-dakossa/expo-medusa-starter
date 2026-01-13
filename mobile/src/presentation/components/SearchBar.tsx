import React from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import { Colors } from '@/constants/theme';
import AppButton from '@/src/presentation/components/AppButton';


export default function SearchBar() {
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Rechercher un produit"
                />
                <AppButton title="Rechercher" onPress={() => {}} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        marginTop: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 12,
        backgroundColor: 'rgba(0, 0, 0, .04)',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, .16)',
    },
})