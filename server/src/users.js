export const users = [];

export const totalUsersConnected = {    // for each channel im gonna have the quantity of users connected.
    general: 0,
    programming: 0,
    hobbies: 0
}

export const addUser = ({ id, name, channel }) => {

    totalUsersConnected[channel] += 1;
    name = name.trim();
    const userExists = users.find(user => user.name === name);
    if (userExists) return { error: 'User already exists in the chat' };

    const user = { id, name };
    users.push(user);
    return user;
}

export const removeUser = ({ id, channel }) => {
    totalUsersConnected[channel] -= 1;
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) return users.splice(index, 1)[0]; // returns the deleted user
}

export const getUser = (id) => {
    return users.find(user => user.id === id);
}