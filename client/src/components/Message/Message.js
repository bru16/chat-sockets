import React from 'react'
import { Container } from '@material-ui/core'

const Message = ({ chatMessages, username }) => {
    return (
        <Container maxWidth="md" className="chat">
            {chatMessages.map((chatMessage) => {
                return (
                    username === chatMessage.username ? // if the user is the sender.
                        <div class="container-chat">
                            <strong style={{ marginRight: 5 }}>•You:</strong>
                            <div style={{wordBreak: 'break-word'}}>{chatMessage.message}</div>
                            <span class="time-right">{chatMessage.messageDate}</span>
                        </div>
                        : <div class="container-chat darker">
                            <strong style={{ marginRight: 5 }}>{chatMessage.username}:</strong>
                            <div>{chatMessage.message}</div>
                            <span class="time-right">{chatMessage.messageDate}</span>
                        </div>
                )
            })}
        </Container>
    )
}

export default Message
