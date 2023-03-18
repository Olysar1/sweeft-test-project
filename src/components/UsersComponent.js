import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { v4 } from "uuid";
import addToHistory from "../redux/historyActions";
import "../Styles.css";

const UsersComponent = ({ userId }) => {
  const [userInfo, setUserInfo] = useState({ list: [], pagination: {} });
  const [page, setPage] = useState(1);
  const [firstLoad, setFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //GET DATA && CONDITIONALLY DECIDE WHO IS RENDERING THE COMPONENT
  useEffect(() => {
    if (!page) {
      setPage(1);
      return;
    }
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${
        !userId ? `${page}/20` : `${userId}/friends/${page}/20`
      }`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Something's wrong!");
        return res.json();
      })
      .then((data) => {
        if (userId) {
          setUserInfo((prevState) => {
            if (prevState.pagination.current === page) {
              return data;
            } else {
              return {
                list: [...prevState.list, ...data.list],
                pagination: data.pagination,
              };
            }
          });
        } else {
          setUserInfo((prevState) => ({
            list: [...prevState.list, ...data.list],
            pagination: data.pagination,
          }));
        }
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [page, firstLoad, userId]);

  //SCROLLING
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight * 0.98
      ) {
        setIsLoading(true);
        setPage(userInfo.pagination.nextPage);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [userInfo]);

  //NAVIGATE TO USER ONCLICK
  const handleUserClick = (user) => {
    navigate(`/user/${user.id}`);
    dispatch(addToHistory(user));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="outer-container">
      <div className={`item-wrapper ${userId && "friends-container"}`}>
        {userInfo.list?.map((item) => {
          return (
            <div
              onClick={() => handleUserClick(item)}
              className="item-container"
              key={v4()}
            >
              <img src={item.imageUrl} alt={`user${item.id}`} />
              <div className="inner-text">
                <strong>{`${item.prefix} ${item.name} ${item.lastName}`}</strong>
                <div>{item.title}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="loader">
        {isLoading && <PulseLoader color={"green"} loading={true} size={40} />}
      </div>
    </div>
  );
};

export default UsersComponent;
