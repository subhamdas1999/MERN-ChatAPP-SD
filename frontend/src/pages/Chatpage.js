import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../context/chatprovider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>

      {user && <SideDrawer />}

          <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">

{/* Left side panel*/}

        {user && <MyChats fetchAgain={fetchAgain}/>}

{/* Right Big Chat Box */}
        {user && <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}


      </Box>

    </div>
  );
};

export default Chatpage;