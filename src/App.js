// Library imports
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
// Redux Slices
import { logoutUser, setUser } from "./redux/slices/userSlice";
import { setGWVideos } from "./redux/slices/groundWorkVideos";
import { setToolVideos } from "./redux/slices/toolVideos";

// Custom Imports
import { apiRequest } from "./api/axios";
import Navigation from "./navigation/navigation";
import Loader from "./components/Modal/loader";
import AlertModal from "./components/Modal/AlertModal";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // States
  // const [user, setUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [path, setPath] = useState(location.pathname);
  // Redux State Read
  const isLoading = useSelector((state) => state.loading.isLoading);
  const { user, token } = useSelector((state) => state.user);

  const updateUser = async () => {
    try {
      const { data } = await apiRequest.get(`/getUser/${user._id}`);
      dispatch(setUser(data?.data));
    } catch (err) {
      if (err.message === "Network Error") return setError("Network Error");
      const data = err?.response?.data;
      setError(data?.message);
    }
  };
  const groundWorkVideos = async () => {
    try {
      const { data } = await apiRequest.get("/getAllGroundWorkVideos");
      dispatch(setGWVideos(data.data));
    } catch (err) {
      if (err.message === "Network Error") return setError("Network Error");
      const data = err?.response?.data;
      setError(data?.message);
    }
  };
  const toolVideos = async () => {
    try {
      const { data } = await apiRequest.get("/getAllToolVideos");
      dispatch(setToolVideos(data.data));
    } catch (err) {
      if (err.message === "Network Error") return setError("Network Error");
      const data = err?.response?.data;
      setError(data?.message);
    }
  };

  useEffect(() => {
    if (user && !localStorage.getItem("token")) {
      dispatch(logoutUser());
      setError("Session expired!, Please login again");
    }
    if (localStorage.getItem("token")) {
      const decodedToken = jwtDecode(localStorage.getItem("token"));
      const currentTime = new Date().getTime() / 1000;
      if (currentTime > decodedToken.exp) {
        dispatch(logoutUser());
        setError("Session expired! Please login again");
      }
    }
  }, []);
  // useEffect(() => {
  //   updateUser();
  //   groundWorkVideos();
  //   toolVideos();
  // }, []);

  useEffect(() => {
    // setPath(location.pathname);
    // console.log(path);
    // setShowModal(false);
    window.scrollTo(0, 0);
    // setTimeout(() => {
    //   !user && setShowModal(true);
    // }, 3000);
  }, [location.pathname]);
  // setTimeout(() => {
  //   !user && setShowModal(true);
  // }, 3000);

  return (
    <div className="App">
      {isLoading && <Loader />}
      <AlertModal
        state={error}
        setState={setError}
        message={error}
        navigateTo="/login"
      />
      {/* {!user &&
        showModal &&
        path !== "/" &&
        path !== "/home" &&
        path !== "/join-us" &&
        path !== "/login" &&
        path !== "/email-confirmation" && (
          <div className="please-sign-up-modal-container">
            <PleaseSignUpModal />
          </div>
        )} */}

      <Navigation />

      {/* <SelectAvatar /> */}
      {/* <AvatarInfo /> */}
      {/* <NavBar /> */}
    </div>
  );
}

export default App;
