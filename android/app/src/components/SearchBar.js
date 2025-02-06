import React from "react";
import { TextInput, StyleSheet } from "react-native";

const SearchBar = ({ value, onChangeText }) => {
  return (
    <TextInput
      style={styles.searchInput}
      placeholder="Search by customer name or product"
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginVertical: 20,
    paddingLeft: 8,
  },
});

export default SearchBar;
