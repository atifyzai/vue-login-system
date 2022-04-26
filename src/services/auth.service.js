import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';
const PASS_URL = 'http://localhost:8080/api/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }

  forgotPassword(user) {
    return axios.post(PASS_URL + 'password-reset', {
      email: user.email
    });
  }

  resetPassword(user) {
    return axios.post(PASS_URL + 'password-reset/' + user.token, {
      password: user.password
    });
  }

  updateProfile(profile) {
    return axios.post(API_URL + 'profile', {
      name: profile.name,
      image: profile.image,
      DOB: profile.DOB,
      education: profile.education,
      user_id: profile.user_id
    });
  }
}

export default new AuthService();
