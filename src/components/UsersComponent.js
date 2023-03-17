import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import "../Styles.css";

const UsersComponent = ({ userId }) => {
  const [userInfo, setUserInfo] = useState({ list: [], pagination: {} });
  const [page, setPage] = useState(1);
  const [firstLoad, setFirstLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!page) {
      setPage(1);
      return;
    }
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }
    if (!page) return;
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
      })
      .catch((err) => console.error(err));
  }, [page, firstLoad, userId]);

  window.onscroll = function () {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight * 0.8
    ) {
      setPage(userInfo.pagination.nextPage);
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="outer-container">
      <div className={`item-wrapper ${userId && "friends-container"}`}>
        {userInfo.list?.map((item) => {
          return (
            <div
              onClick={() => handleUserClick(item.id)}
              className="item-container"
              key={v4()}
            >
              <img src={item.imageUrl} alt="user" />
              <div className="inner-text">
                <strong>{`${item.prefix} ${item.name} ${item.lastName}`}</strong>
                <div>{item.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersComponent;
