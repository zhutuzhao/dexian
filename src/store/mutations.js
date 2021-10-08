export default {
  changeLogin(state, user) {
    // 修改token，并将token存入localStorage
    // 修改role，并将role存入localStorage
    state.Authorization = user.Authorization;
    state.role = user.role;
    state.id = user.id;
    localStorage.setItem("Authorization", user.Authorization);
    localStorage.setItem("role", user.role);
    localStorage.setItem("id", user.id);
  },
};
