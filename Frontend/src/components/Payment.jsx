/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { FaCheck } from "react-icons/fa";
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
  const [cardCompleted, setCardCompleted] = useState(false);

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
    if (name === "number" && value.length === 16 && luhnCheck(value)) {
      e.target.blur(); // Unfocus the input field
      setCardIncomplete(false);
      setCardValid(true);
    } else if (
      (name === "number" &&
        value.length >= 15 &&
        value.length <= 19 &&
        value.startsWith("34") &&
        luhnCheck(value)) ||
      (name === "number" &&
        value.length >= 15 &&
        value.length <= 19 &&
        value.startsWith("37") &&
        luhnCheck(value))
    ) {
      console.log(`${value} america express is valid`);
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

    // format expiry field
    if (name === "expiry" && value.length === 2) {
      setFormInputs((prev) => ({ ...prev, [name]: value + "/" }));
    } else if (name === "expiry" && value.length === 4) {
      e.target.blur(); // Unfocus the input field
    }

    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e) => {
    setFormInputs((prev) => ({ ...prev, focus: e.target.name }));
  };

  // Luhn algorithm implementation
  const luhnCheck = (value) => {
    let sum = 0;
    for (let i = 0; i < value.length; i++) {
      let cardNum = parseInt(value[i], 10);
      if ((value.length - i) % 2 === 0) {
        cardNum *= 2;
        if (cardNum > 9) {
          cardNum -= 9;
        }
      }
      sum += cardNum;
    }
    return sum % 10 === 0;
  };

  // update the cardValid state when the card number is completed
  useEffect(() => {
    if (
      formInputs.number.length === 16 ||
      formInputs.number.startsWith("34") ||
      formInputs.number.startsWith("37")
    ) {
      setCardCompleted(true);
    } else {
      setCardCompleted(false);
    }
  }, [formInputs.number]);

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
            {cardValid && !cardIncomplete ? (
              <FaCheck style={{ color: "green" }} />
            ) : (
              <p style={{ color: "red" }}>Your card is not Valid</p>
            )}
            {cardIncomplete && (
              <p style={{ color: "red" }}>Your card is incomplete</p>
            )}
          </Label>

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
            CVV
            <Input
              type="text"
              name="cvc"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="CVV"
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
