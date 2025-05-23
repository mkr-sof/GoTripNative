import React from "react";
import { Modal, View, TouchableWithoutFeedback, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

function Popup({ children, onClose, visible }) {
  return (
    <Modal
      accessible={true}
      accessibilityViewIsModal={true}
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.popupContainer}>
          <View style={styles.popupContent}>
            <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  popupContent: {
    height: "80%",
    width: "80%",
    backgroundColor: "#2f3031",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default Popup;