/* eslint-disable no-unused-vars */
import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import styled from "styled-components";

const Container = styled.div``;

const FormWrapper = styled.form``;

const Input = styled.input``;

const Payment = () => {
  const [formInputs, setFormInputs] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e) => {
    setFormInputs((prev) => ({ ...prev, focus: e.target.name }));
  };

  return (
    <Container>
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
      </FormWrapper>
    </Container>
  );
};

export default Payment;
