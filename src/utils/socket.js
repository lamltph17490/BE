export let onlineUsers = []
export const addNewUser = (id, socketId,socketRole) => {
    !onlineUsers.some((user) => user.id === id) &&
      onlineUsers.push({ id, socketId,socketRole});
  };

export const getUser = (id) => {
  console.log(onlineUsers, id);
    return onlineUsers.find((user) => user.id == id );
  };

export const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
}