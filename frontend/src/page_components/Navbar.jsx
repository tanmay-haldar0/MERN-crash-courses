import React from 'react';
import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import {PlusSquareIcon} from "@chakra-ui/icons/PlusSquare";
import { useColorMode } from "../components/ui/color-mode"
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
// import { CiSquarePlus } from "react-icons/ci";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxH={"1140px"} px={8}>
        <Flex 
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
                base:"column",
                sm:"row"
            }}
            >

            <Text
            fontSize={{base:"2xl",sm:"md",lg:"3xl"}}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            >
                <Link to={"/"}>Products Store </Link>
            </Text>

            <HStack spacing={2} alignItems={"center"}>
					<Link to={"/create"}>
						<Button w={2} variant={"plain"}>
							<PlusSquareIcon fontSize={20} />
						</Button>
					</Link>
          <Button onClick={toggleColorMode} variant={"plain"}>
						{colorMode === "light" ? <LuSun size='20'  />  : <IoMoon size={20} />}
            
					</Button>
		    </HStack>

        </Flex>
    </Container>
  )
}

export default Navbar