import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useParams } from "react-router-dom";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";

function Bookingscreen({ match }) {
  let { roomid, fromdate, todate } = useParams();
  const [room, setroom] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [totalamount, settotalamount] = useState();

  const fdate = moment(fromdate, "DD-MM-YYYY");
  const tdate = moment(todate, "DD-MM-YYYY");
  const totaldays = moment.duration(tdate.diff(fdate)).asDays() + 1;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      window.location.href = "/login";
    }
    return async () => {
      try {
        setloading(true);
        const roomData = (
          await axios.post("/api/rooms/getroombyid", {
            roomid: roomid,
          })
        ).data;
        setroom(roomData);
        settotalamount(roomData.rentperday * totaldays);
        setloading(false);
      } catch (error) {
        console.log("Error");
        setloading(false);
        seterror(true);
      }
    };
  }, []);

  async function bookRoom() {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
    };
    try {
      setloading(true);
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
      setloading(false);
      Swal.fire('Congratulations','Your room booked successfully','success').then(result=>{
        window.location.href='/profile'
      })
    } catch (error) {
      setloading(false);
      console.log("error");
      Swal.fire('Oops','Something went wrong','error')
    }
  }

  async function onToken(token){
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token
    };
    try {
      setloading(true);
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
      setloading(false);
      Swal.fire('Congratulations','Your room booked successfully','success')
    } catch (error) {
      setloading(false);
      console.log("error");
      Swal.fire('Oops','Something went wrong','error')
    }
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 ">
            <div className="col-md-5">
              <h4>{room.name}</h4>
              <img src={room.imageurls[0]} className="bigimg" />
            </div>
            <div className="col-md-5">
              <div style={{ textAlign: "right" }}>
                <h5>Booking Details</h5>
                <hr />
                <b>
                  <p>
                    Name :{" "}
                    {JSON.parse(localStorage.getItem("currentUser")).name}
                  </p>
                  <p>From Date : {fromdate}</p>
                  <p>To Date : {todate}</p>
                  <p>Max Count : {room.maxcount}</p>
                </b>
              </div>
              <div style={{ textAlign: "right" }}>
                <h5>Amount</h5>
                <hr />
                <b>
                  <p>Total days : {totaldays}</p>
                  <p>Rent per day: {room.rentperday}</p>
                  <p>Total Amount: {totalamount}</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <StripeCheckout
                  currency="INR"
                  amount={totalamount * 100}
                  token={onToken}
                  stripeKey="pk_test_51NOPUmSAnL1GHNfbQZM9uKo0Cy5zt0zmgvrWcChmE6qr7TlFoCM865OYhVYwN77V4SZ5sGJPwCxkQKDZzsXZtBiU00V9PzeqeG"
                >
                  <button className="btn btn-warning">Pay Now</button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
