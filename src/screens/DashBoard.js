import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Area } from "@ant-design/plots";

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
  const config = {
    data,
    xField: "createdAt",
    yField: "totalPrice",
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
      };
    },
  };

  return <Area {...config} />;
};

export default DashBoard;
