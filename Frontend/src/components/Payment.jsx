/* eslint-disable no-unused-vars */
import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import styled from "styled-components";

const Container = styled.div`
  background-color: #82ccdd;
  background-image: url("https://images.unsplash.com/photo-1525253086316-115d7aab269f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9");
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background: #E5E5E5;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
`;

const Input = styled.input`
  padding: 12px;
  margin: 12px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 12px;
  margin: 12px 0;
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

const Payment = () => {
  const [formInputs, setFormInputs] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e) => {
    setFormInputs((prev) => ({ ...prev, focus: e.target.name }));
  };

  return (
    <Container>
      <Wrapper>
        <Cards
          number={formInputs.number}
          expiry={formInputs.expiry}
          cvc={formInputs.cvc}
          name={formInputs.name}
          focused={formInputs.focus}
        />
        <FormWrapper>
          <Input
            type="number"
            name="number"
            placeholder="1234 1234 1234 1234"
            value={formInputs.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formInputs.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <Input
            type="text"
            name="expiry"
            placeholder="MM/YY Expiry"
            value={formInputs.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <Input
            type="number"
            name="cvc"
            placeholder="CVC"
            value={formInputs.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <Button>Confirm Payment</Button>
        </FormWrapper>
      </Wrapper>
    </Container>
  );
};

export default Payment;
