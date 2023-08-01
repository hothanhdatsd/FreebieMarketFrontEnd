import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const DashBoard = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [data, setData] = useState([]);

  const asyncFetch = () => {
    fetch("/api/orders", Token)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  // const formatDay = (data) => {
  //   data.forEach((item) => {
  //     item.createdAt = item.createdAt.toLocaleDateString("en-US", {
  //       timeZone: "UTC",
  //     });
  //   });
  // };
  useEffect(() => {
    asyncFetch();
    // formatDay(data);
  }, []);
  const Token = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };


  return <div className="home">
    {/* <div className="box box8">
        <BarChartBox {...barChartBoxVisit} />
      </div>
      <div className="box box9">
        <BarChartBox {...barChartBoxRevenue} />
      </div> */}
  </div>;
};

export default DashBoard;
