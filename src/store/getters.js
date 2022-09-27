const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.userId,
  userName: state => state.user.userInfo.userName,
  image: state => state.user.userInfo.image,
  loginTime: state => state.user.loginTime
}
export default getters
