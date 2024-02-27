import { createContext, useState } from "react";
import * as auth from '../api/auth';

export const MessageContext = createContext();
MessageContext.displayName = "messageContextName";

const MessageContextProvider = ({ children }) => {
    const [messageData, setMessageData] = useState([]);

    const sendMessage = async (userInfo, message) => {
        // const type = userInfo ? "receive" : "send";
        const { id } = userInfo;
        const messageInfo = { id, message };

        await auth.send(messageInfo);
    }

    return(
        <MessageContext.Provider value = {{ sendMessage, messageData, setMessageData }}>
            { children }
        </MessageContext.Provider>
    )
}

export default MessageContextProvider;