// Library Imports
import React from "react";
import { useSelector } from "react-redux";
// Custom Imports
import HomeLoggedIn from "./HomeLoggedIn";
import HomeLoggedOut from "./HomeLoggedOut";

const Home = () => {
  const user = useSelector((state) => state.user.user);

  if (user?.isPaymentDone) {
    return <HomeLoggedIn />;
  }

  // console.log(isPaymentDone ? "logged in" : "logged out");
  return (
    <div>
      <HomeLoggedOut />
    </div>
  );
};

export default Home;
