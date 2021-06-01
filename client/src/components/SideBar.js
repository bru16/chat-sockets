import React, { useState } from 'react'
import { Button, Divider, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons'


const SideBar = ({ allUsers }) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsDrawerOpen(!isDrawerOpen)}>View users</Button>
            <Drawer anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <List>
                    <ListItem>
                        <h3><FontAwesomeIcon icon={faUser} /> Users connected: {allUsers.length}</h3>
                    </ListItem>
                    <Divider />
                    {allUsers.map((user) => (
                        <ListItem button key={user.id}>
                            <h6>• {user.name}</h6>
                            <FontAwesomeIcon style={{ marginLeft: 'auto' }} icon={faCommentAlt} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    )
}

export default SideBar
