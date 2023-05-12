/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import {
  Button,
  Container,
  FormWrapper,
  Input,
  Label,
  Wrapper,
} from "./payment.styles";

const Payment = () => {
  const [formInputs, setFormInputs] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const [error, setError] = useState(false);
  const [cardIncomplete, setCardIncomplete] = useState(false);
  const [cardValid, setCardValid] = useState(true);
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // only allow numbers for card number, expiry and cvc
    if (name === "number" || name === "cvc" || name === "expiry") {
      if (!/^\d*$/.test(value)) {
        setFormInputs((prev) => ({ ...prev, [name]: "" }));
        return;
      }
    }

    // check if card number is incomplete
    if (name === "number" && value.length < 16) {
      setCardIncomplete(true);
    } else {
      setCardIncomplete(false);
    }

    // validate card number length
    if (name === "number" && value.length === 16) {
      e.target.blur(); // Unfocus the input field
      setCardIncomplete(false);
      setCardValid(true);
    } else if (
      (name === "number" && value.length === 19 && value.startsWith("34")) ||
      (name === "number" && value.length === 19 && value.startsWith("37"))
    ) {
      e.target.blur(); // Unfocus the input field
      setCardIncomplete(false);
      setCardValid(true);
    } else {
      setCardValid(false);
    }

    // validate CVC length based on card number's first two digits
    if (name === "cvc") {
      if (
        (formInputs.number.startsWith("34") ||
          formInputs.number.startsWith("37")) &&
        value.length === 4
      ) {
        e.target.blur(); // Unfocus the input field
        setCardValid(true);
      } else if (value.length === 3) {
        e.target.blur(); // Unfocus the input field
        setCardValid(true);
      } else {
        setCardValid(false);
      }
    }

    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e) => {
    setFormInputs((prev) => ({ ...prev, focus: e.target.name }));
  };

  //   useEffect(() => {
  //     if (!cardValid) {
  //       setShouldSubmit(false);
  //     }
  //   }, [cardIncomplete, cardValid]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const [month, year] = formInputs.expiry.split("/");
    const expiryDate = new Date(year, month - 1, 1);

    if (expiryDate < new Date()) {
      setError(true);
      return;
    }
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
        <FormWrapper onSubmit={handleSubmit}>
          <Label>
            Card Number
            <Input
              type="text"
              name="number"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="1234 1234 1234 1234"
              value={formInputs.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </Label>
          {cardIncomplete && (
            <p style={{ color: "red" }}>Your card is incomplete</p>
          )}

          <Label>
            Card Holder Name
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={formInputs.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </Label>

          <Label>
            Expiry
            <Input
              type="text"
              name="expiry"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="MM/YY Expiry"
              value={formInputs.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              style={{ borderColor: error ? "red" : "#ccc" }}
            />
            {error && (
              <p style={{ color: "red" }}>
                The expiry date must be after present time
              </p>
            )}
          </Label>
          <Label>
            CVC
            <Input
              type="text"
              name="cvc"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="CVC"
              value={formInputs.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </Label>

          <Button disabled={!cardValid} type="submit">
            Confirm Payment
          </Button>
        </FormWrapper>
      </Wrapper>
    </Container>
  );
};

export default Payment;
