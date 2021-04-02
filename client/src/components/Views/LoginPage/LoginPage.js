import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

function LoginPage(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const body = {
      email,
      password,
    };

    dispatch(loginUser(body)).then((reponse) => {
      if (reponse.payload.loginSuccess) return props.history.push("/");
      return alert("error");
    });
  };

  const onKeyDownHandler = (event) => {
    event.code === "Enter" && event.preventDefault();
  };

  return (
    <Warpper>
      <Logo>
        <Link to="/">
          <LogoImg src="/images/icon/logo@3x.png" />
        </Link>
      </Logo>
      <Form onSubmit={onSubmitHandler} onKeyDown={onKeyDownHandler}>
        <Input
          type="email"
          value={email}
          onChange={onEmailHandler}
          placeholder="아이디"
        />
        <Input
          type="password"
          value={password}
          onChange={onPasswordHandler}
          placeholder="비밀번호"
          marginTop="12px"
        />
        <LoginButton marginTop="16px">로그인</LoginButton>
      </Form>
      <ButtonBox>
        <RegisterButton marginRight="15px">
          <Link to="/register">* 회원가입</Link>
        </RegisterButton>

        <RegisterButton>* ID / PW 찾기</RegisterButton>
      </ButtonBox>
    </Warpper>
  );
}

const Warpper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fcfcfc;
  overflow: hidden;
`;

const Logo = styled.h1`
  width: 156px;
  height: 43px;
  margin-top: 200px;
  margin-bottom: 60px;
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Form = styled.form`
  width: 93.04812834224599%;
  flex-direction: column;

  display: ${(props) => props.display || "flex"};
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  padding-left: 12px;
  font-size: 14px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  background-color: #ffffff;
  margin-top: ${(props) => props.marginTop || "0"};

  &::-webkit-input-placeholder {
    color: #bfbfbf;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  height: 56px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;

  margin-top: ${(props) => props.marginTop || "0"};
  background-color: ${(props) => props.backgroundColor || "#226bef"};
  border-color: ${(props) => props.borderColor || "#eaeaea"};
  box-shadow: ${(props) => props.boxShadow || "none"};
  color: ${(props) => props.color || "#fff"};
`;

const ButtonBox = styled.div`
  width: 93.04812834224599%;
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
`;

const RegisterButton = styled.button`
  width: fit-content;
  height: 18px;
  font-size: 12px;
  color: #3d3d3d;
  margin-right: ${(props) => props.marginRight || "0"};
`;

export default withRouter(LoginPage);
