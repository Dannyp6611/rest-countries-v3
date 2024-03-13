import { BrowserRouter, Routes, Route } from "react-router-dom";

import Countries from "./components/Countries";
import Error from "./components/Error";
import SingleCountry from "./components/SingleCountry";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="/:name" element={<SingleCountry />} />
        <Route path="/not-found" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
