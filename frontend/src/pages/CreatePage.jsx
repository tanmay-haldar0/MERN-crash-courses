import { Container, VStack, Heading, Box, Input, Button } from '@chakra-ui/react';
import { toaster } from "../components/ui/toaster"
import { React, useState } from 'react';
import { useProductStore } from '../store/Product';


const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  });

  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if(!success){ 
      toaster.create({
        title: message,
        type: "error",
        duration: 5000,
        isClosable: true,
      });

      }else{
        toaster.create({
          title: message,
          type:"success",
          duration: 5000,
          isClosable: true,
        });
        setNewProduct({name: '', price: '', image: ''});
      }
    }
    return (
      <Container
        maxW={"2xl"}
      >
        <VStack
          spacing={8}
        >
          <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>Create New Product</Heading>
          <Box w={"full"}  p={6} rounded={"lg"} shadow={"md"}
          >
            <VStack spacing={4}>
              <Input placeholder='Product Name'
                name='name'
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <Input placeholder='Product Price'
                type='number'
                name='price'
                value={newProduct.price}
                invalid errorText="Enter a Number"
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
              <Input placeholder='Product Image URL'
                name='image'
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              />

              <Button onClick={handleAddProduct} w={"full"} variant={"surface"}>Create</Button>
            </VStack>
          </Box>

        </VStack>
      </Container>
    )
  }
export default CreatePage;