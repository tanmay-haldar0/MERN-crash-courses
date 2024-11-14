import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useColorModeValue } from '../components/ui/color-mode'
import { toaster } from "../components/ui/toaster";
import { Input, Stack, Button, Box, Heading, HStack, IconButton, Image, Text } from "@chakra-ui/react";
import {
    DialogActionTrigger,
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger
} from "../components/ui/dialog";
import { Field } from "../components/ui/field";
import { useProductStore } from '../store/Product';
import { useState } from 'react';


const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textColor = useColorModeValue("black", "white");
    const bg = useColorModeValue("white", "gray.800");
    const { deleteProduct, editProduct } = useProductStore();

    const handleDeleteProduct = async (id) => {
        const { success, message } = await deleteProduct(id);
        if (!success) {
            toaster.create({
                title: message,
                type: "error",
                duration: 5000,
            });
        }
        else {
            toaster.create({
                title: message,
                type: "success",
                duration: 5000,
            });


        }
    };

    const handleEditProduct = async (id,updatedProduct) => {
        const{success,message} = await editProduct(id,updatedProduct);
        if(!success){
            toaster.create({
                title:message,
                type:"error", 
                duration:5000})
        }else {
            toaster.create({
                title: "The product has been editted successfully",
                type: "success",
                duration: 5000
            });
    };
}
    return (
        <Box
            shadow='2xl'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}

        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    ₹{product.price}
                </Text>

                <HStack spacing={2}>

                    <DialogRoot placement={"center"}>
                        <DialogTrigger asChild>
                            <IconButton
                                variant={'outline'}
                            >
                                <FaEdit />
                            </IconButton>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Product</DialogTitle>
                            </DialogHeader>
                            <DialogBody pb="4">
                                <Stack gap="4">
                                    <Field label="Product Name">
                                        <Input placeholder="hi" name='name' value={updatedProduct.name}
                                            onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                                        />
                                    </Field>
                                    <Field label="Price">
                                        <Input name='price' type='number' value={updatedProduct.price}
                                            onChange={(e) => setUpdatedProduct({...updatedProduct, number: e.target.value})}
                                        />
                                    </Field>
                                    <Field label="Image URL">
                                        <Input name='image' value={updatedProduct.image}
                                            onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}    
                                        />
                                    </Field>
                                </Stack>
                            </DialogBody>
                            <DialogFooter>
                                <DialogActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogActionTrigger>
                                <Button onClick={() => handleEditProduct(product._id, updatedProduct)}>Save</Button>
                            </DialogFooter>
                        </DialogContent>
                    </DialogRoot>

                    <IconButton
                        variant={'outline'}
                        onClick={() => handleDeleteProduct(product._id)}
                    >
                        <MdDelete />
                    </IconButton>

                </HStack>
            </Box>


        </Box>
    )
}

export default ProductCard
