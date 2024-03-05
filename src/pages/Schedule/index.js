import React, { useState, useEffect } from "react";
import NavBar from "../../components/Navbar";
import images from "../../constants/images";
import GreenLineBreak from "../../components/GreenLineBreak";
import VidCard from "../../components/VidCard";
import DatePicker from "../../components/DatePicker";
import GreenButton from "../../components/Button/GreenButton";
import TimeButton from "../../components/Button/TimeButton";
import Footer from "../../components/Footer";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/loadingSlice";
import { apiRequest } from "../../api/axios";
import { imageURL } from "../../api/axios";
import moment from "moment/moment";
import { getScheduleVG } from "../../redux/slices/scheduleVibeGuide";
import { useNavigate } from "react-router-dom";

const Schedule = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const postedDate = moment(date).format("L");

  const [vibeGuideDetail, setVibeGuideDetail] = useState("");
  const [error, setError] = useState("");
  const [isValidInput, setIsValidInput] = useState("");
  const { id } = useParams();
  const [selectedTimeDuration, setSelectedTimeDuration] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  const submitAppointmentHandler = async () => {
    if (!selectedTimeDuration) {
      setIsValidInput("Select session length.");
      return;
    } else if (!selectedTime) {
      setIsValidInput("Choose session time.");
      return;
    } else if (!postedDate) {
      setIsValidInput("Select date.");
      return;
    }

    const updatedDate = moment(postedDate).add(1, "day");
    const vgData = {
      vibeGuide: id,
      bookingTime: selectedTime,
      sessionLength: selectedTimeDuration,
      bookingDate: new Date(updatedDate),
    };

    // try {
    //   const response = await apiRequest.post("/booking", vgData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       // Authorization: `Bearer ${token}`,
    //     },
    //   });

    //   if (response?.data?.data) {
    //     dispatch(setLoading(false));
    //     console.log(response?.data?.data);
    //   }
    // } catch (err) {
    //   setError(
    //     err.response?.data?.message ? err.response?.data?.message : err.message
    //   );
    //   dispatch(setLoading(false));
    // }

    dispatch(getScheduleVG(vgData));
    navigate("/payment");
  };

  const vibeGuideDetails = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiRequest.get(`/users/detail/${id}`);

      setVibeGuideDetail(data?.data);
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      setError(err.message);
    }
  };

  useEffect(() => {
    vibeGuideDetails();
  }, []);

  const availability = {
    sun: [],
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
  };

  for (const day in vibeGuideDetail?.weeklyHours) {
    if (
      vibeGuideDetail?.weeklyHours[day].length >= 2 &&
      !vibeGuideDetail?.weeklyHours[day]?.includes(null)
    ) {
      for (const nestedDay in vibeGuideDetail?.weeklyHours[day]) {
        availability[day].push(vibeGuideDetail?.weeklyHours[day][nestedDay]);
      }
    } else if (vibeGuideDetail?.weeklyHours[day][0]?.includes(":")) {
      availability[day].push(vibeGuideDetail?.weeklyHours[day][0]);
    }
  }

  const bookingNotAvailable = Object.entries(availability).map(
    ([day, slots]) => {
      if (slots.length > 1) {
        return slots.map((booking) => {
          return vibeGuideDetail?.bookedDates?.some((bookingSlot) => {
            const dateMatches =
              bookingSlot.date ===
              moment(date, "ddd MMM DD YYYY HH:mm:ss [GMT]Z")
                .add(1, "day")
                .toISOString();
            const timeMatches = bookingSlot?.time?.includes(booking);

            return dateMatches && timeMatches;
          });
        });
      } else {
        return vibeGuideDetail?.bookedDates?.some((booking) => {
          const dateMatches =
            booking.date ===
            moment(date, "ddd MMM DD YYYY HH:mm:ss [GMT]Z")
              .add(1, "day")
              .toISOString();
          const timeMatches = booking.time.map((bookingSlot) =>
            slots?.includes(bookingSlot)
          );

          return dateMatches && timeMatches?.includes(true);
        });
      }
    }
  );

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="teacher-schedule-info">
          <h3 className="teacher-heading">{vibeGuideDetail?.vibeGuideName}</h3>
          <div className="row d-flex teacher-row">
            <div className="col-lg-4 col-md-6 teacher-img-col">
              <div className="teacher-image">
                <img src={`${imageURL}${vibeGuideDetail?.photo}`} />
              </div>
            </div>
            <div className="col-lg-8 col-md-6">
              <p className="teacher-desc">{vibeGuideDetail?.description}</p>
            </div>
          </div>
        </div>
      </div>
      <GreenLineBreak />
      {/* <div className="teacher-schedule-video">
        <VidCard />
      </div> */}
      <div className="container-xl" style={{ paddingTop: "50px" }}>
        <div className="row ">
          <div className="col-md-7 schedule-left">
            <h4
              className="schedule-heading"
              style={{ textDecoration: "capitalize" }}
            >{`${vibeGuideDetail?.vibeGuideName} Schedule`}</h4>

            <DatePicker
              onDate={setDate}
              overrideDates={vibeGuideDetail?.dateOverride}
            />

            <div
              className="schedule-left-btn"
              onClick={submitAppointmentHandler}
            >
              {/* <Link to="/payment"> */}
              <GreenButton text="Submit Appointment" />
              {/* </Link> */}
            </div>

            <p style={{ color: "red", fontWeight: "bolder" }}>{isValidInput}</p>
          </div>
          <div className="col-md-5 schedule-right">
            <h4 className="schedule-heading">Session Length</h4>
            <div className="schedule-right-timeSelect">
              <div className="schedule-right-timeBtn ">
                <div
                  className={`${
                    selectedTimeDuration === "30 Minutes" && "active-time-btn"
                  } `}
                  onClick={() => setSelectedTimeDuration("30 Minutes")}
                >
                  <TimeButton first="30" second="Min" />
                </div>
                <p className="item-price">
                  ${vibeGuideDetail?.thirtyMinSession}
                </p>
              </div>
              <div className="schedule-right-timeBtn">
                <div
                  className={`${
                    selectedTimeDuration === "60 Minutes" && "active-time-btn"
                  } `}
                  onClick={() => setSelectedTimeDuration("60 Minutes")}
                >
                  <TimeButton first="60" second="Min" />
                </div>
                <p className="item-price">
                  ${vibeGuideDetail?.sixtyMinSession}
                </p>
              </div>
            </div>
            <h5 className="schedule-info">
              Choose a Time for your Session
              <br /> {postedDate && postedDate}
            </h5>
            <div className="divider"></div>
            <div className="schedule-time">
              <div className="schedule-time-evening">
                {Object.entries(availability).map(
                  ([day, time], i) =>
                    day === days[date.getDay()] &&
                    time.map((val, j) => {
                      if (bookingNotAvailable[i]?.length > 1) {
                        return bookingNotAvailable[i][j] ? (
                          <div
                            key={`${day}-${j}`}
                            className={`schedule-time-btn`}
                            style={{ pointerEvents: "none", opacity: 0.4 }}
                          >
                            <TimeButton first={val} second={"scheduled"} />
                          </div>
                        ) : (
                          <div
                            key={`${day}-${j}`}
                            className={`schedule-time-btn ${
                              val == selectedTime && " active-time-btn"
                            }`}
                            onClick={() => setSelectedTime(val)}
                          >
                            <TimeButton first={val} />
                          </div>
                        );
                      } else if (typeof bookingNotAvailable[i] == "boolean") {
                        return bookingNotAvailable[i] ? (
                          <div
                            key={`${day}-${j}`}
                            className={`schedule-time-btn`}
                            style={{ pointerEvents: "none", opacity: 0.4 }}
                          >
                            <TimeButton first={val} second={"scheduled"} />
                          </div>
                        ) : (
                          <div
                            key={`${day}-${i}`}
                            className={`schedule-time-btn ${
                              val == selectedTime && "active-time-btn"
                            }`}
                            onClick={() => setSelectedTime(val)}
                          >
                            <TimeButton first={val} />
                          </div>
                        );
                      }
                    })
                )}
              </div>
            </div>
          </div>
        </div>
        <h4 className="schedule-note">
          <span>Note: </span> Katie will email you a reminder to coordinate with
          you on zoom
        </h4>
      </div>
      <Footer />
    </>
  );
};

export default Schedule;
