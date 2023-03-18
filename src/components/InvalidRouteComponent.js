import { useNavigate } from "react-router-dom";

const InvalidRouteComponent = () => {
  const navigate = useNavigate();

  //PLAN B - IN CASE OF BAD ROUTE
  const goHome = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>PAGE NOT FOUND!</h1>
      <button onClick={goHome}>Home</button>
    </div>
  );
};

export default InvalidRouteComponent;
