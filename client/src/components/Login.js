import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWIthAuth";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });

  const handleChanges = (e) => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  };

  let history = useHistory();

  const login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", creds)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
        history.push("/protected");
      });
  };

  return (
    <>
      <div className="logins">
        <form onSubmit={login}>
          <input
            type="text"
            placeholder="username"
            name="username"
            value={creds.username}
            onChange={handleChanges}
          />

          <br />
          <br />

          <input
            type="text"
            placeholder="password"
            name="password"
            value={creds.password}
            onChange={handleChanges}
          />
          <button>submit</button>
        </form>
      </div>
    </>
  );
};

export default Login;
