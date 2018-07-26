import axios from 'axios'

const instance = axios.create({
  baseURL: "https://myburger-react-app.firebaseio.com/"
});

export default instance;