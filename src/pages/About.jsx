import React, { useContext } from 'react';
import { AuthContext } from '../context/Authcontext';

const About = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const changeUserName = (userName) => {
    setAuth((prevState) => {
      return {
        ...prevState,
        user: {
          ...prevState.user,
          name: userName
        }
      }
    })
  }

  const changeUserBtn = () => {
    if (auth.logedIn) {
        return (
            <div>
                <button
                    onClick={() => {
                        changeUserName("Randry");
                    }}
                >
                    Change user
                </button>
            </div>
        );
    }
  }
  return (
    <div>
        <h1>About page</h1>
        <div>
          <p>
            <pre>
              {JSON.stringify(auth)}
            </pre>
          </p>
        </div>
        {changeUserBtn()}
    </div>
  );
};

export default About;
