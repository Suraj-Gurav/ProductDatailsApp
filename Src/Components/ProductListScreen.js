import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts]= useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://dummyjson.com/products')
    .then(res=>res.json())
      .then(response => {
        console.log('Api result....',response?.products);
        setProducts(response?.products ?? []);
        setFilteredProducts(response?.products ?? []);
        setLoading(false);
      })
      .catch(error => {        
        setError('products Error........', error);
        setLoading(false);
      });
  }, []);

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Product Details', { productId: item.id })}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.itemInfoWrapper} >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.itemPrice}>Category : {item?.category}</Text>
          <Text style={styles.itemPrice}>Rs.{item.price}  ({item?.discountPercentage} %) off </Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
          <Text style={styles.itemPrice}>Rating : <AntDesign name={'star'} color={'orange'} size={14}/> {item?.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleSearchItem = (value) => {
    const filteredData = products.filter((item)=>
      item.title.toLowerCase().includes(value)
    || item.description.toLowerCase().includes(value)
    || item.category.toLowerCase().includes(value)
    )
    console.log("handleSearchItem filtered data",filteredData)
    setFilteredProducts(filteredData)
  }
  return (
    
    loading ? <ActivityIndicator style={{ flex:1, justifyContent:'center', alignItems:'center'}} size="large" color="#0000ff" />
    :<View style={styles.container}>
      {/* <Text style={[styles.title, styles.headerText]}>Product List</Text> */}
      <TextInput 
        style={styles.inputBox}
        placeholder='Search product'
        onChangeText={(e)=>handleSearchItem(e.toLowerCase())}
      />
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item?.id?.toString()}
        ListEmptyComponent={<Text>{error}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerText:{textAlign:'center', margin:10},
  inputBox:{padding:7, backgroundColor:'#fff', marginVertical:10, borderRadius:5},
  container: { flex: 1, padding: 10 },
  itemInfoWrapper:{  borderColor:'black', padding:10, paddingRight:95 },
  card: {display:'flex', flexDirection:'row', backgroundColor: '#fff', marginBottom: 15, padding: 10, borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.1 },
  image: { width: 100, height: 100, borderRadius: 8,  borderColor:'black' },
  title: { fontSize: 18, fontWeight: 'bold' },
  itemPrice:{fontSize:14, fontWeight: 'bold'},
  itemDescription:{fontSize:12}
});

export default ProductListScreen;
