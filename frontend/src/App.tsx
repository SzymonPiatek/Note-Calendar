import "./App.css";
import { Button } from "./stories/components/button/Button";
import { Navbar } from "./stories/components/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Button size="medium" children="Przycisk" />
    </>
  );
}

export default App;
