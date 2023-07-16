import React, { useState, useEffect } from "react";
import { Tabs,Tag } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Swal from "sweetalert2";

const { TabPane } = Tabs;
function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="m-3">
      <h1></h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <div className="m-2 bs">
            <h2>My Profile</h2>
            <br />
            <h3>Name :{user.name}</h3>
            <h3>Email : {user.email}</h3>
            <h3>Is Admin? : {user.isAdmin ? "Yes" : "No"}</h3>
          </div>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setbookings] = useState();
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  console.log(error)
  useEffect(() => {
    return async () => {
      try {
        setloading(true);
        const data = await (
          await axios.post("/api/bookings/getbookingsbyuserid", {
            userid: user._id,
          })
        ).data;
        console.log(data);
        setbookings(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    };
  }, []);

  async function cancelbooking(bookingid, roomid) {
    try {
      setloading(true);
      const data = await (
        await axios.post("/api/bookings/cancelbooking", {
          bookingid,
          roomid,
        })
      ).data;
      console.log(data);
      setloading(false);
      Swal.fire(
        "Congratulations",
        "Your booking has been cancelled",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
      Swal.fire("Oops", "Something went wrong", "error");
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="bs">
                  <h4>{booking.room}</h4>
                  <p>
                    <b>BookingId</b> : {booking._id}
                  </p>
                  <p>
                    <b>CheckIn</b>: {booking.fromdate}
                  </p>
                  <p>
                    <b>Check Out </b>: {booking.todate}
                  </p>
                  <p>
                    <b>Amount</b>: {booking.totalamount}
                  </p>
                  <p>
                    <b>Status</b>:{" "}
                    {booking.status === "booked" ? <Tag color="green">CONFIRMED</Tag> : <Tag color="red">CANCELLED</Tag>}
                  </p>
                  {booking.status !== "cancelled" && (
                    <div style={{ textAlign: "right" }}>
                      <button
                        class="btn btn-warning"
                        onClick={() => {
                          cancelbooking(booking._id, booking.roomid);
                        }}
                      >
                        CANCEL BOOKING
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
