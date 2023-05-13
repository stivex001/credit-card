import { styled } from "styled-components";

export const Container = styled.div`
  background-color: #82ccdd;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  /* margin-top: 100px; */
  background: #e5e5e5;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const Input = styled.input`
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

export const Button = styled.button`
  padding: 8px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
  background-color: #0070f3;
  color: #fff;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #0055b8;
  }

`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
