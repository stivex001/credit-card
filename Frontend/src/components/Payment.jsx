/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [validError, setValidError] = useState(false);
  const [cardValid, setCardValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [cardCompleted, setCardCompleted] = useState(false);
  const [expiryError, setExpiryError] = useState(false);
  const [expiryValid, setExpiryValid] = useState(false);
  const [cvvValid, setCvvValid] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const navigate = useNavigate();

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
      setCardValid(false);
      setValidError(true);
    } else {
      setCardValid(true);
      setValidError(false);
    }

    // validate card number length
    if (name === "number" && value.length === 16 && luhnCheck(value)) {
      e.target.blur(); // Unfocus the input field
      setCardValid(true);
      setValidError(false);
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
      e.target.blur(); // Unfocus the input field
      setCardValid(true);
      setValidError(false);
    } else {
      setCardValid(false);
      setValidError(true);
    }

    // Validate card holder name

    if (name === "name") {
      setNameValid(value.length >= 2 && value.trim().length > 0);
      setCardValid(true);
      setValidError(false);
    }

    // validate CVC length based on card number's first two digits
    if (name === "cvc") {
      if (
        (formInputs.number.startsWith("34") ||
          formInputs.number.startsWith("37")) &&
        value.length === 4
      ) {
        e.target.blur(); // Unfocus the input field
        setCvvValid(true);
        setCardValid(true);
        setValidError(false);
      } else if (value.length === 3) {
        e.target.blur(); // Unfocus the input field
        setCvvValid(true);
        setCardValid(true);
        setValidError(false);
      } else {
        setCvvValid(false);
        setCardValid(false);
        setValidError(true);
      }
    }

    // Validate the expiry field
    if (name === "expiry") {
      const expMonth = value.substring(0, 2);
      const expYear = value.substring(2);
      const expDate = new Date(`20${expYear}`, expMonth - 1);
      const currentDate = new Date();

      if (expDate <= currentDate && value.length === 4) {
        setExpiryError(true);
        setExpiryValid(false);
        setCardValid(false);
        setValidError(true);
        e.target.blur(); // Unfocus the input field
      } else {
        setExpiryError(false);
        setExpiryValid(true);
        setCardValid(true);
        setValidError(false);
        if (value.length === 4) {
          e.target.blur(); // Unfocus the input field
          setFormInputs((prev) => ({ ...prev, [name]: `${value}/` }));
        }
      }
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
  //   useEffect(() => {
  //     if (
  //       formInputs.number.length === 16 ||
  //       formInputs.number.startsWith("34") ||
  //       formInputs.number.startsWith("37")
  //     ) {
  //       setCardCompleted(true);
  //     } else {
  //       setCardCompleted(false);
  //     }
  //   }, [formInputs.number]);

  //   useEffect(() => {
  //     if (!cardValid) {
  //       setShouldSubmit(false);
  //     }
  //   }, [cardIncomplete, cardValid]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!cardValid || !nameValid || expiryError) {
      setError(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/payment", {
        cardNumber: formInputs.number,
        cardHolder: formInputs.name,
        expiryDate: formInputs.expiry,
        cvv: formInputs.cvc,
      });
      if (response.status === 201) {
        setPaymentSuccessful(true);
      }
      console.log(response);
      setFormInputs({
        number: "",
        expiry: "",
        cvc: "",
        name: "",
        focus: "",
      });
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (paymentSuccessful) {
      toast.success("Payment Successful");
      setTimeout(() => {
        navigate("/success");
      }, 5000);
    }
  }, [paymentSuccessful, navigate]);

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
        <FormWrapper onSubmit={handlePayment}>
          <Label>
            Card Number
            <Input
              type="text"
              name="number"
              required
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="1234 1234 1234 1234"
              value={formInputs.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            {cardValid && <FaCheck style={{ color: "green" }} />}
            {validError && (
              <p style={{ color: "red" }}>Your card is not Valid</p>
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
              required
            />
            {nameValid && <FaCheck color="green" />}
          </Label>

          <Label>
            Expiry
            <Input
              type="text"
              name="expiry"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="MM / YY Expiry"
              value={formInputs.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
            />
            {expiryError && (
              <p style={{ color: "red" }}>Your card has expired</p>
            )}
            {expiryValid && <FaCheck color="green" />}
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
              required
            />
            {cvvValid && <FaCheck color="green" />}
          </Label>

          <Button type="submit">Confirm Payment</Button>
        </FormWrapper>
      </Wrapper>
      <ToastContainer />
    </Container>
  );
};

export default Payment;
