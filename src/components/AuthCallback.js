import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { setUser } from './components/notes/noteSlice.js';

// This component serves as an entry point for
// a user at the end of the google-auth process.
// It gives us a convenient way to set user state.
export const AuthCallback = () => {

const dispatch = useDispatch();
const history = useHistory();

const token = Cookies.get('token');
const decodedToken = jwtDecode(token);
const userId = decodedToken.id;

dispatch(setUser({ userId, loggedIn: true}))
history.push('/notes');

return null;
}
