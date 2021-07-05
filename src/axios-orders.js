import axios from 'axios'
const instance=axios.create({
    baseURL:'https://react-project1-a649a-default-rtdb.firebaseio.com/'
});
export default instance;