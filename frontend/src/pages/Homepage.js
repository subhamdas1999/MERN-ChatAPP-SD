import React from 'react'
import {Box, Container,Text, Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs} from "@chakra-ui/react";
  
import Signup from '../components/Authentication/Signup';
import Login from '../components/Authentication/Login';

const Homepage = () => {
  return (
    <Container maxW="xl" centerContent>

          <Box
            display="flex"
            justifyContent="center"
            p={3}
            bg={"white"}
            w="100%"
            m="40px 0 15px 0"
            borderRadius="lg"
            borderWidth="1px"
          >
              <Text fontSize="4xl" fontFamily="Work sans" color={'black'}>Subham-Chat-App</Text>

          </Box>

          <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" color={'black'}>

          <Tabs isFitted variant="soft-rounded" colorScheme='green'>

          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>

          <TabPanels>

              <TabPanel> <Login></Login> </TabPanel>

              <TabPanel> <Signup></Signup> </TabPanel>

          </TabPanels>

        </Tabs>

          </Box>
          
        
      </Container>
  )
}

export default Homepage