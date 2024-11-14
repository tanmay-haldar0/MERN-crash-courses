import { Container,VStack, Text, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/Product';
import ProductCard from '../page_components/ProductCard.jsx';



const HomePage = () => {
  const {fetchProduct, products} = useProductStore();

  useEffect(() => {
    fetchProduct();
    
  },[
    fetchProduct,
  ]);
  // console.log("products: ", products);

  return (
    <Container maxW={"container.xl"} py={5}>
      <VStack spacing={8}>
        <Text
          fontSize={"3xl"}
          fontWeight={"bold"}
          textAlign={"center"}
        >
          Current Products 🚀
        </Text>

        <SimpleGrid columns={{
          base: 1,
          md:2,
          lg:3,
          xl:4
          }} 
          gap="30px"
          w={"full"}
          py={10}
          >
          {products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
        </SimpleGrid>

          {products.length === 0 && (
            <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            textAlign={"center"}
          >
            No Products Found 🥺 {" "}
            <Link to={"/create"}>
            <Text as={'span'} color={"blue.500"} _hover={{textDecoration :"underline"}}>
            Create a New Product 😃
            </Text>
            </Link>
          </Text>
          )
          }
        
      </VStack>
    </Container>
  )
}

export default HomePage