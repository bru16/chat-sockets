import React, { useState } from 'react'
import { Button, Divider, Drawer, List, ListItem, Popover, Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons'


const SideBar = ({ allUsers }) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

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
                        <>
                            <ListItem button onClick={handleClick} key={user.id}>
                                <h6>• {user.name}</h6>
                                <FontAwesomeIcon style={{ marginLeft: 'auto' }} icon={faCommentAlt} />
                            </ListItem>
                            <Popover
                                anchorEl={anchorEl}
                                id={user.id}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'center',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'center',
                                    horizontal: 'left',
                                }}
                            >
                                <Grid container>
                                    <Grid container item justify='center' className="mt-2">
                                        Do you want to private chat with {user.name}?
                                    </Grid>
                                    <Grid container item justify='center' className="pb-1">
                                        <Button style={{ color: 'green' }}>Yes</Button>
                                        <Button style={{ color: 'red' }} >No</Button>
                                    </Grid>
                                </Grid>
                            </Popover>
                        </>
                    ))}
                </List>
            </Drawer>
        </>
    )
}

export default SideBar
