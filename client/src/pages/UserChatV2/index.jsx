import React, { useCallback, useEffect, useState } from "react";
import "./index.scss";
import {
  MainContainer,
  Avatar,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Search,
  Sidebar,
  ConversationList,
  Conversation,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton,
  EllipsisButton,
  TypingIndicator,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
// import { Avatar } from "@mui/material";
const UserChatV2 = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarStyle, setSidebarStyle] = useState({});
  const [chatContainerStyle, setChatContainerStyle] = useState({});
  const [conversationContentStyle, setConversationContentStyle] = useState({});
  const [conversationAvatarStyle, setConversationAvatarStyle] = useState({});

  const handleBackClick = () => setSidebarVisible(!sidebarVisible);

  const handleConversationClick = useCallback(() => {
    if (sidebarVisible) {
      setSidebarVisible(false);
    }
  }, [sidebarVisible, setSidebarVisible]);
  useEffect(() => {
    if (sidebarVisible) {
      setSidebarStyle({
        display: "flex",
        flexBasis: "auto",
        width: "100%",
        maxWidth: "100%",
      });
      setConversationContentStyle({
        display: "flex",
      });
      setConversationAvatarStyle({
        marginRight: "1em",
      });
      setChatContainerStyle({
        display: "none",
      });
    } else {
      setSidebarStyle({});
      setConversationContentStyle({});
      setConversationAvatarStyle({});
      setChatContainerStyle({});
    }
  }, [
    sidebarVisible,
    setSidebarVisible,
    setConversationContentStyle,
    setConversationAvatarStyle,
    setSidebarStyle,
    setChatContainerStyle,
  ]);
  return (
    <div
      style={{
        height: "92vh",
        position: "relative",
      }}
    >
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false} style={sidebarStyle}>
          <ConversationList>
            <Conversation onClick={handleConversationClick}>
              <Avatar
                src={
                  "https://images.pexels.com/photos/1310474/pexels-photo-1310474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                name="Lilly"
                status="available"
                style={conversationAvatarStyle}
              />
              <Conversation.Content
                name="Lilly"
                lastSenderName="Lilly"
                info="Yes i can do it for you"
                style={conversationContentStyle}
              />
            </Conversation>
            <Conversation onClick={handleConversationClick}>
              <Avatar
                src={
                  "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                }
                name="Zoe"
                status="invisible"
                style={conversationAvatarStyle}
              />
              <Conversation.Content
                name="Zoe"
                lastSenderName="Zoe"
                info="Yes i can do it for you"
                style={conversationContentStyle}
              />
            </Conversation>
          </ConversationList>
        </Sidebar>
        <ChatContainer style={chatContainerStyle}>
          <ConversationHeader>
            <ConversationHeader.Back onClick={handleBackClick} />
            <Avatar
              src={
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              name="Zoe"
            />
            <ConversationHeader.Content
              userName="Zoe"
              info="Active 10 mins ago"
            />
            <ConversationHeader.Actions>
              <VoiceCallButton />
              <VideoCallButton />
              <EllipsisButton orientation="vertical" />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList>
            <MessageSeparator content="friday, 15 March 2024" />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "single",
              }}
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "asd",
                direction: "outgoing",
                position: "single",
              }}
            />
          </MessageList>
          <MessageInput placeholder="Type message here" />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default UserChatV2;
