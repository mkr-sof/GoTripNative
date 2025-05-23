import React from 'react';
import { Image, StyleSheet } from 'react-native';

function Avatar({ src, alt, size = 40, borderWidth = 2 }) {
    return (
        <Image
            source={{ uri: src }}
            accessibilityLabel={alt}
            style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth,
                borderColor: "#e5eaf1",
            }}
        />
    );
}



export default Avatar;