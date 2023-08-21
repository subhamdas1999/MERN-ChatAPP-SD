
import { Box, 
    Button, 
    Tooltip, 
    Text,
     Menu, 
     MenuButton, 
     Avatar, 
     MenuList, 
     MenuItem, 
     MenuDivider, 
     Drawer,
      DrawerOverlay, 
      DrawerContent, 
      DrawerHeader, 
      DrawerBody, 
      Input, 
      useToast,
      
      
      Spinner,
      } from "@chakra-ui/react";

import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { useState } from "react";
import { ChatState } from "../../context/chatprovider";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";

import { useDisclosure } from "@chakra-ui/hooks";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/userListItem"


function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, setSelectedChat ,chats, setChats} = ChatState();
  const history = useHistory();

  const toast = useToast();  // importing useToast HOOK


  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

// left drawer handel search Functionality ---START-------------

const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } 
    
    catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

// -----------// left drawer handel search Functionality  END------------



const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();

    } catch (error) {

        toast({
            title: "Error fetching the chat",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
      
    }
  };




  return (
    <>
    <Box
        display="flex"
        justifyContent={"space-between"}
        alignItems="center"
        bg="white"
        
        padding="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="search user to chat" hasArrow placement="bottom-end">

            <Button variant={"ghost"} onClick={onOpen}>
                <i class="fas fa-search"></i>
                <Text d={{ base: "none", md: "flex" }} px={4}>Search User</Text>
            </Button>


        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans">Talk-A-Tive</Text>

        <div>
            <Menu>
                <MenuButton p={1}>
                    <BellIcon fontSize="3xl" m={1}/>
                </MenuButton>
                
            </Menu>


            <Menu> 
                
                <MenuButton as={Button} rightIcon={ <ChevronDownIcon/>}> 
            <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic}/>


                </MenuButton>
                
                <MenuList>
                    <ProfileModal user={user}>

                    <MenuItem >My Profile</MenuItem>

                    </ProfileModal >
                    <MenuDivider/>

                    <MenuItem onClick={logoutHandler}>LogOut</MenuItem>

                </MenuList>


            </Menu>


            </div>
    </Box>

    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay></DrawerOverlay>
        <DrawerContent>
            <DrawerHeader borderBottomWidth={1}>Search User</DrawerHeader>

            <DrawerBody>

                <Box display="flex" padding={2}>
                <Input
                    placeholder="Search by name or email"
                    mr={2}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={handleSearch}>Go</Button> 

                </Box>

                {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem 
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}>

                </UserListItem>

              ))
            )}

            {loadingChat && <Spinner ml="auto" display="flex" />}


            </DrawerBody>

        </DrawerContent>

    </Drawer>


    </>
     
  );
}

export default SideDrawer;