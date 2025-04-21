import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";
import * as ImagePicker from "react-native-image-picker";

function FileUpload({ onChange, image, onRemoveImage }) {
  const handlePickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorMessage) {
          console.log("ImagePicker Error: ", response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          onChange(response.assets[0].uri);
        }
      }
    );
  };

  const handleRemoveImage = () => {
    onRemoveImage();
  };

  return (
    <View style={styles.container}>
      {!image && (
        <TouchableOpacity style={styles.uploadButton} onPress={handlePickImage}>
          <MaterialIcons name="file-upload" size={35} color="#444" />
        </TouchableOpacity>
      )}
      {image && (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: image }} style={styles.imagePreview} />
          <TouchableOpacity style={styles.closeIcon} onPress={handleRemoveImage}>
            <MaterialIcons name="close" size={35} color="#ccc" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
  },
  uploadButton: {
    backgroundColor: "#ccc",
    borderRadius: 50,
    padding: 6,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreviewContainer: {
    marginTop: 10,
    position: "relative",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 4,
    resizeMode: "cover",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
    padding: 5,
  },
});

export default FileUpload;