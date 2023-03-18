import UsersComponent from "./components/UsersComponent";
import { Routes, Route } from "react-router-dom";
import SingleUserComponent from "./components/SingleUserComponent";
import InvalidRouteComponent from "./components/InvalidRouteComponent";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersComponent />} />
      <Route path="/user/:userId" element={<SingleUserComponent />} />
      <Route path="*" element={<InvalidRouteComponent />} />
    </Routes>
  );
};

export default App;
