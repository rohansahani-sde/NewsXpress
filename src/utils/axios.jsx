import axios from "axios";


const instance = axios.create({
  baseURL: "https://api.nytimes.com/svc/",
  headers: {
    accept: 'application/json',

  }

});

export default instance;

