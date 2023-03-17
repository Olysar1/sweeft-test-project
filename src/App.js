import UsersComponent from "./components/UsersComponent";
import { Routes, Route } from "react-router-dom";
import SingleUserComponent from "./components/SingleUserComponent";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersComponent />} />
      <Route path="/user/:userId" element={<SingleUserComponent />} />
    </Routes>
  );
};

export default App;
