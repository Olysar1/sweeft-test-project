import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

const HistoryComponent = () => {
  const history = useSelector((state) => state.history);
  const navigate = useNavigate();

  const handleHistoryClick = (id) => {
    navigate(`/user/${id}`);
  };

  return (
    <div className="view-history">
      {history.map((item) => {
        const temp = `${item.prefix} ${item.name} ${item.lastName}`;
        return (
          <div
            className="history-link"
            onClick={() => handleHistoryClick(item.id)}
            key={v4()}
          >
            <span>{temp}</span>
            {history.lastIndexOf(item) !== history.length - 1 ? " > " : ""}
          </div>
        );
      })}
    </div>
  );
};

export default HistoryComponent;
