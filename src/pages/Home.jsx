import React, {useContext} from 'react';
import { AuthContext } from '../context/Authcontext';

const Home = () => {
  const {auth, setAuth} = useContext(AuthContext);
  return (
      <div>
          <h1>Home page</h1>
          <pre>
            {JSON.stringify(auth)}
          </pre>
          {process.env.REACT_APP_API_URL}
      </div>
  );
};

export default Home;
