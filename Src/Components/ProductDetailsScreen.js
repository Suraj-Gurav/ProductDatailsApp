import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProductDetailsScreen = ({ route }) => {
  const { productId } = route.params;
  const navigate = useNavigation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
    .then(res=>res.json())
      .then(response => {
        console.log("Product Details result ==== ", response);
        setProduct(response);
        setLoading(false);
      })
      .catch((error) => {
        setError('product details error', error);
        setLoading(false);
      });
  }, [productId]);


  return (
    loading ? <ActivityIndicator style={{ flex:1, justifyContent:'center', alignItems:'center'}} size="large" color="#0000ff" />
    : <View style={styles.container}>
      {/* <Text style={[styles.title, styles.headerText]}>Product Details</Text> */}
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <View style={styles.priceSection}>
         <Text style={styles.price}>Price: Rs.{product.price} ({product?.discountPercentage} %) off</Text>
         <Text style={styles.price}>Rating : 
            <AntDesign
              name='star'
              color='orange'
              size={14}/> {product?.rating}
          </Text>
      </View>
      <Text style={styles.description}>{product.description}</Text>
      <TouchableOpacity style={styles.backButton} onPress={()=>navigate.goBack()}>
      <Text style={styles.backButtonText}>  <AntDesign
              name='arrowleft'
              color='#fff'
              size={14}/> Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText:{textAlign:'center', margin:10},
  container: { flex: 1, padding: 20 },
  image: { width: '100%', height: 300, borderRadius: 8 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  description: { fontSize: 14, marginVertical: 5 },
  price: { fontSize: 16, fontWeight: 'bold' },
  priceSection:{width:'100%',display:'flex', flexDirection:'row', justifyContent:'space-between'},
  backButton:{backgroundColor:'#60b5e6', marginVertical:10, padding:10, borderRadius:5, width:'100%'},
  backButtonText:{textAlign:'center', color:'#fff', fontWeight:'bold', fontSize:16}
});

export default ProductDetailsScreen;
