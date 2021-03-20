import { userService } from '../_services';
import { router } from '../_helpers';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

const actions = {
    login({ dispatch, commit }, { username, password, date }) {
        // console.log("state", state.user)
        commit('loginRequest', { username });
        return new Promise((resolve, reject) => {
            let User;
            userService.login(username, password, date)
                .then(
                    user => {
                        User = user
                        commit('loginSuccess', user);
                        // console.log("logged user", user)
                            router.push('/projects');
                        
                        commit('loginFailure', user);
                        resolve(User)

                    },
                    error => {
                        // console.log("user", error)
                        commit('loginFailure', error);
                        dispatch('alert/error', error, { root: true });
                        reject(error)
                    }
                );
        })

    },
    logout({ commit }) {
        commit('logout');
        userService.logOut()
        return true

    },

    register({ dispatch, commit }, user) {

        commit('registerRequest', user);
        return new Promise((resolve, reject) => {
            userService.register(user)
                .then(
                    user => {
                        // console.log(user)
                        commit('registerSuccess', user);
                        // router.push('/login');
                        setTimeout(() => {
                            // display success message after route change completes
                            dispatch('alert/success', 'Registration successful', { root: true });
                        })
                        resolve(user)
                    },
                    error => {
                        commit('registerFailure', error);
                        dispatch('alert/error', error, { root: true });
                        reject(error)
                    }
                );
        })

    },
    resendMail({ commit }, userData) {
        // console.log("userD", userData)
        let data = {
            email: userData['email'],
            id: userData['id']
        }
        userService.sendMail(data).then(data => {
            // console.log("mail sent", data)

        })
    },

    verify({ commit }, email) {
        return new Promise((resolve, reject) => {
            userService.verify(email).then(data => {
                // console.log(data)
                resolve(data)
            }), error => {
                reject(error)
            }
        })

    },

    newPassword({ commit }, data) {
        return new Promise((resolve, reject) => {
            userService.setPass(data).then(data => {
                // console.log("set", data)
                resolve(data)
            }), error => {
                reject(error)
            }
        })

    }
};

const mutations = {
    loginRequest(state, user) {
        // console.log("user", user)
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        // console.log("success", user)
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = { user: null };
    },
    logout(state) {
        state.status = {};
        state.user = { user: null };
    },
    registerRequest(state, user) {
        state.status = { registering: true };
    },
    registerSuccess(state, user) {
        // console.log("user", JSON.stringify(user))
        state.status = {};

    },
    registerFailure(state, error) {
        state.status = {};
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};