import { BrowserRouter, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <h1>Detailing u 4D formatu</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error omnis
          voluptate molestiae consequuntur ratione cumque est voluptatibus illo?
          Molestias temporibus ea ab voluptas quam neque possimus? Eum quibusdam
          itaque cupiditate.
        </p>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
};

export default App;
