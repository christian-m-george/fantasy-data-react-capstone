import config from '../config'

const AuthApiService = {
    postLogin(credentials) {
        return fetch(`${config.API_ENDPOINT}/auth/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then(res => {
                if (res.status !== 200) {
                    alert('Invalid login details')
                }
                else {
                    return res.json()
                }
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            })
            .catch(err => console.log(err))
    },
    postUser(user) {
        return fetch(`${config.API_ENDPOINT}/user/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res => {
                if (res.status === 400) {
                    alert('username or email is already taken')
                }
                else if (res.status !== 201) {
                    alert('could not create user')
                }
                else {
                    window.location = '/'
                }
            })
            .catch(err => console.log(err))

    },
}

export default AuthApiService