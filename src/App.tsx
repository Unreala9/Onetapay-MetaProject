// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/index";
import DoubleSliderAuth from "./pages/login"; // <- ya ./pages/DoubleSliderAuth

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-gray-900 font-poppins">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<DoubleSliderAuth />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
