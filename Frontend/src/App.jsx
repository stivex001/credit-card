import { BrowserRouter, Route, Routes } from "react-router-dom";
import Payment from "./components/Payment";
import Success from "./components/Success";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Payment />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
