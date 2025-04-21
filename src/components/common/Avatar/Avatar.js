import React from 'react';
import { Image, StyleSheet } from 'react-native';

function Avatar({ src, alt, showMoreInfo }) {
    return (
        <Image
            style={showMoreInfo ? styles.avatarSmall : styles.avatar}
            source={{ uri: src }}
            accessibilityLabel={alt}
        />
    );
}

const styles = StyleSheet.create({
    avatar: {
        width: 250,
        height: 250,
        borderRadius: 125, 
        borderWidth: 4,
        borderColor: '#e5eaf1',
    },
    avatarSmall: {
        width: 80,
        height: 80,
        borderRadius: 40, 
        borderWidth: 4,
        borderColor: '#e5eaf1',
    },
});

export default Avatar;