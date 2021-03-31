import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";

function RegisterPasswordPage(props) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onPasswordConfirmHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return console.log("비밀번호가 일치하지 않습니다.");
    }

    const body = {
      password,
    };

    dispatch(registerUser(body)).then((reponse) => {
      if (reponse.payload.success) return props.history.push("/");
      return alert("Failed to sign up");
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={onSubmitHandler}
        >
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={onPasswordHandler}
          />
          <label>Password Confirm</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={onPasswordConfirmHandler}
          />
          <br />
          <button>다음</button>
        </form>
      </div>
    </>
  );
}

export default withRouter(RegisterPasswordPage);
