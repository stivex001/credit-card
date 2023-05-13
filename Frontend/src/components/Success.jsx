import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const SuccessCard = styled.div`
  width: 500px;
  padding: 50px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const SuccessIcon = styled.div`
  font-size: 80px;
  color: #4caf50;
`;

const SuccessText = styled.h1`
  font-size: 36px;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const SuccessMessage = styled.p`
  font-size: 20px;
  color: #888;
`;

const Button = styled.button`
  display: inline-block;
  padding: 10px 20px;
  margin-top: 30px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #388e3c;
  }
`;

const Success = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // redirect to home page or any other page
    navigate("/");
  };

  return (
    <Wrapper>
      <SuccessCard>
        <SuccessIcon>&#10003;</SuccessIcon>
        <SuccessText>Payment Successful</SuccessText>
        <SuccessMessage>
          Your payment has been successfully processed.
        </SuccessMessage>
        <Button onClick={handleButtonClick}>Continue Shopping</Button>
      </SuccessCard>
    </Wrapper>
  );
};

export default Success;
