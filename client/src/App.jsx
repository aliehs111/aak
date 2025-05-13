// client/src/App.jsx
import { BrowserRouter } from "react-router-dom";
import InnerApp from "./InnerApp";

export default function App() {
  return (
    <BrowserRouter>
      <InnerApp />
    </BrowserRouter>
  );
}
