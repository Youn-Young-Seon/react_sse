import { useContext, useEffect, useRef } from "react";
import "./chat.css";
import { LoginContext } from "../contexts/LoginContextProvider";
import { MessageContext } from "../contexts/messageContextProvider";
import { EventSourcePolyfill } from "event-source-polyfill";
import Cookies from "js-cookie";
import MessageBox from "../components/MessageBox";

export default function Chat(){
    const { userInfo } = useContext(LoginContext);
    const { sendMessage, messageData, setMessageData } = useContext(MessageContext);

    const inputRef = useRef(null);

    const inputInit = () => {
        inputRef.current.value = "";
    }

    const onSend = (e) => {
        e.preventDefault();

        const form = e.target;
        const message = form.message.value;

        sendMessage(userInfo, message);
        inputInit();
    }

    useEffect(() => {
        let eventSource;
        const connect = () => {
            eventSource = new EventSourcePolyfill(
                `/api/sse`,
                {
                    headers: {
                        Authorization: `Bearer ${ Cookies.get("accessToken") }`
                    },
                    withCredentials: true,
                    // QueryString으로 전달할 Last-Event-ID의 이름을 명시
                    lastEventIdQueryParameterName: 'message',
                    // 최대 연결 유지 시간을 ms 단위로 설정, 서버에 설정된 최대 연결 유지 시간보다 길게 설정
                    heartbeatTimeout: 600000
                }
            );

            eventSource.addEventListener("message", (e) => {
                let parseData = JSON.parse(e.data);                
                setMessageData([...messageData, parseData]);
            });

            eventSource.addEventListener("error", (error) => {
                console.error("EventSource error:", error);
            });            
        };

        if(!eventSource) {
            connect();
        }

        return () => {
            if (eventSource) {
                eventSource.close();
            }
        };
    }, [messageData, setMessageData])

    return(
        <>            
            <MessageBox/>

            <form className="msger-inputarea" onSubmit={ (e) => onSend(e) }>
                <input type="text" name="message" className="msger-input" placeholder="Enter your message..." ref={ inputRef }/>
                <input type="submit" className="msger-send-btn" value="Send" />
            </form>
        </>
    )
}