import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

function RegisterPage(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const ValidateEmail = (inputText) => {
    const errorText = document.querySelector(".error_text");
    const successText = document.querySelector(".success_text");
    const nextButton = document.querySelector(".next_button");
    const mailFormat = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    if (!mailFormat.test(inputText)) {
      successText.style.cssText = "display: none;";
      inputText !== ""
        ? (errorText.style.cssText = "display: block;")
        : (errorText.style.cssText = "display: none;");
      nextButton.style.cssText = "";
      return false;
    }

    successText.style.cssText = "display: block;";
    errorText.style.cssText = "display: none;";
    nextButton.style.cssText = `
      background-color: #226bef;
      border-color: #226bef;
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
      color: #fff;
    `;

    return true;
  };

  const onEmailHandler = (event) => {
    ValidateEmail(event.currentTarget.value);
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    const errorTextPw = document.querySelector(".error_text_pw");
    const passwordFormat = /^(?=.*\d)(?=.*[a-z]).{9,20}$/;
    const lengthOfPassword = event.currentTarget.value.length;

    setPassword(event.currentTarget.value);
    if (password.match(passwordFormat))
      return (errorTextPw.style.cssText = `display: none;`);
    if (lengthOfPassword === 0)
      return (errorTextPw.style.cssText = `display: none;`);
    return (errorTextPw.style.cssText = `display: block;`);
  };

  const onPasswordConfirmHandler = (event) => {
    const errorTextCfPw = document.querySelector(".error_text_cfpw");
    const successTextCfPw = document.querySelector(".success_text_cfpw");
    const lengthOfConfirmPassword = event.currentTarget.value.length;
    const submitButton = document.querySelector(".submit_button");

    setConfirmPassword(event.currentTarget.value);
    if (password !== event.currentTarget.value) {
      errorTextCfPw.style.cssText = `display: block;`;
      successTextCfPw.style.cssText = `display: none;`;
      submitButton.style.cssText = "";
    } else {
      errorTextCfPw.style.cssText = `display: none;`;
      successTextCfPw.style.cssText = `display: block;`;
      submitButton.style.cssText = `
        background-color: #226bef;
        border-color: #226bef;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        color: #fff;
      `;
    }

    if (lengthOfConfirmPassword === 0) {
      errorTextCfPw.style.cssText = `display: none;`;
    }
  };

  const onFirstSubmitHandler = (event) => {
    const emailForm = document.querySelector(".email_form");
    const passwordForm = document.querySelector(".password_form");

    event.preventDefault();

    if (ValidateEmail(email)) {
      emailForm.style.cssText = `display: none`;
      passwordForm.style.cssText = `display: flex`;
    }
  };

  const onSecondSubmitHandler = (event) => {
    const MAX_LENGTH_PASSWORD = 10;
    event.preventDefault();

    if (password !== confirmPassword) {
      return;
    }
    if (password.length < MAX_LENGTH_PASSWORD) {
      return;
    }

    const body = {
      email,
      password,
    };

    dispatch(registerUser(body)).then((reponse) => {
      if (reponse.payload.success) return props.history.push("/login");
      return alert("Failed to sign up");
    });
  };

  const onClickEmailFormHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    props.history.push("/login");
  };

  const onClickPasswordFormHandler = (event) => {
    const emailForm = document.querySelector(".email_form");
    const passwordForm = document.querySelector(".password_form");
    const successText = document.querySelector(".success_text");
    const nextButton = document.querySelector(".next_button");
    const submitButton = document.querySelector(".submit_button");
    const successTextCfPw = document.querySelector(".success_text_cfpw");

    event.preventDefault();
    event.stopPropagation();

    emailForm.style.cssText = `display: flex`;
    passwordForm.style.cssText = `display: none`;
    successText.style.cssText = "display: none;";
    successTextCfPw.style.cssText = `display: none;`;
    nextButton.style.cssText = "";
    submitButton.style.cssText = "";
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const onKeyDownHandler = (event) => {
    event.code === "Enter" && event.preventDefault();
  };

  return (
    <Warpper>
      <Form
        className="email_form"
        onSubmit={onFirstSubmitHandler}
        onKeyDown={onKeyDownHandler}
      >
        <BeforeButton onClick={onClickEmailFormHandler}>
          <ArrowImg src="/images/icon/back@2x.png" alt="뒤로가기화살표" />
        </BeforeButton>
        <MainLabel>
          <MainLabelText
            src="/images/font/main-label@2x.png"
            alt="이메일주소를입력해주세요."
          />
        </MainLabel>
        <SubLabel>
          <SubLabelText
            src="/images/font/sub-label@2x.png"
            alt="이메일주소로로그인할수있습니다."
          />
        </SubLabel>
        <Input
          type="text"
          value={email}
          onChange={onEmailHandler}
          placeholder="이메일"
        />
        <ErrorText className="error_text">
          올바른 이메일 형식이 아닙니다.
        </ErrorText>
        <SuccessText className="success_text">
          올바른 이메일 형식입니다.
        </SuccessText>
        <NextButton className="next_button">다음</NextButton>
      </Form>

      <Form
        className="password_form"
        onSubmit={onSecondSubmitHandler}
        onKeyDown={onKeyDownHandler}
        display="none"
      >
        <BeforeButton onClick={onClickPasswordFormHandler}>
          <ArrowImg src="/images/icon/back@2x.png" />
        </BeforeButton>
        <MainLabel>비밀번호를 입력해주세요.</MainLabel>
        <SubLabel>알파벳+숫자+특수문자 포함 8자 이상입니다.</SubLabel>
        <Input
          type="password"
          value={password}
          onChange={onPasswordHandler}
          placeholder="비밀번호"
        />
        <ErrorText className="error_text_pw">
          알파벳+숫자+특수문자 포함 8자 이상입니다.
        </ErrorText>
        <Input
          type="password"
          value={confirmPassword}
          onChange={onPasswordConfirmHandler}
          placeholder="비밀번호 확인"
          marginTop="12px"
        />
        <ErrorText className="error_text_cfpw">
          비밀번호가 일치하지 않습니다.
        </ErrorText>
        <SuccessText className="success_text_cfpw">
          비밀번호가 일치합니다.
        </SuccessText>
        <NextButton className="submit_button">다음</NextButton>
      </Form>
    </Warpper>
  );
}

const Warpper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const Form = styled.form`
  width: 93.04812834224599%;
  height: 100%;
  flex-direction: column;
  display: ${(props) => props.display || "flex"};
`;

const BeforeButton = styled.button`
  width: 24px;
  height: 24px;
  margin-top: 16px;
  margin-bottom: 44px;
  cursor: pointer;
`;

const ArrowImg = styled.img`
  width: 100%;
`;

const MainLabel = styled.label`
  margin-bottom: 8px;
`;

const MainLabelText = styled.img`
  width: 236px;
`;

const SubLabelText = styled.img`
  width: 210px;
`;

const SubLabel = styled.label`
  font-size: 14px;
  color: #808080;
  margin-bottom: 24px;
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

const ErrorText = styled.p`
  font-size: 12px;
  color: #e64841;
  margin-top: 4px;

  display: ${(props) => props.display || "none"};
`;

const SuccessText = styled.p`
  font-size: 12px;
  color: #6cd15a;
  margin-top: 4px;

  display: ${(props) => props.display || "none"};
`;

const NextButton = styled.button`
  width: 93.04812834224599%;
  height: 56px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  position: fixed;
  bottom: 24px;
  cursor: pointer;

  background-color: ${(props) => props.backgroundColor || "#eaeaea"};
  border-color: ${(props) => props.borderColor || "#eaeaea"};
  box-shadow: ${(props) => props.boxShadow || "none"};
  color: ${(props) => props.color || "#bfbfbf"};
`;

export default withRouter(RegisterPage);
