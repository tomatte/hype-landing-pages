import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Hub } from "./pages/Hub";
import { Viewer } from "./pages/Viewer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/view/:id" element={<Viewer />} />
      </Routes>
    </BrowserRouter>
  );
}
