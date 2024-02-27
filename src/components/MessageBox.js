import { useContext } from "react";
import { MessageContext } from "../contexts/messageContextProvider";
import { LoginContext } from "../contexts/LoginContextProvider";

const MessageBox = () => {
    const { messageData } = useContext(MessageContext);
    const { userInfo } = useContext(LoginContext);

    const { id } = userInfo;
    console.log(messageData);

    if(!messageData){
        return(
            <></>
        )
    }

    return(        
        messageData.map((messageInfo, i) => {
            console.log(messageInfo);
            if (messageInfo.id === id){
                return <p className="send" key={i}>{ messageInfo.message }</p>
            } else {
                return <p className="receive" key={i}>{ messageInfo.message }</p>
            }
        })
    )
}

export default MessageBox;