import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Swal from "sweetalert2";

const { TabPane } = Tabs;
function Adminscreen() {
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      window.location.href = "/login";
    }
    if (!user.isAdmin) {
      window.location.href = "/home";
    }
  }, []);  

  return (
    <div className="m-3">
      <div style={{ textAlign: "center" }}>
        <h1>Admin Panel</h1>
      </div>
      <div className="container bs">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Bookings" key="1">
            <Bookings />
          </TabPane>
          <TabPane tab="Rooms" key="2">
            <Rooms />
          </TabPane>
          <TabPane tab="Add room" key="3">
            <Addroom />
          </TabPane>
          <TabPane tab="Users" key="4">
            <Users />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Adminscreen;

export function Bookings() {
  const [bookings, setbookings] = useState("");
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    return async () => {
      try {
        setloading(true);
        const Data = (await axios.get("/api/bookings/getallbookings")).data;
        setbookings(Data);
        setloading(false);
      } catch (error) {
        console.log("Error");
        setloading(false);
        seterror(true);
      }
    };
  }, []);

  return (
    <div>
      <div className="row mt-3">
        <div className="col-md-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Booking Id</th>
                <th>User Id</th>
                <th>Room</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings &&
                bookings.map((booking) => {
                  return (
                    <tr>
                      <th>{booking._id}</th>
                      <th>{booking.userid}</th>
                      <th>{booking.room}</th>
                      <th>{booking.fromdate}</th>
                      <th>{booking.todate}</th>
                      <th>{booking.status}</th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function Rooms() {
  const [rooms, setrooms] = useState("");
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    return async () => {
      try {
        setloading(true);
        const roomData = (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(roomData);
        setloading(false);
      } catch (error) {
        console.log("Error");
        setloading(false);
        seterror(true);
      }
    };
  }, []);

  return (
    <div>
      <div className="row mt-3">
        <div className="col-md-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Room Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Rent Per Day</th>
                <th>Max Count</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {rooms &&
                rooms.map((room) => {
                  return (
                    <tr>
                      <th>{room._id}</th>
                      <th>{room.name}</th>
                      <th>{room.type}</th>
                      <th>{room.rentperday}</th>
                      <th>{room.maxcount}</th>
                      <th>{room.phonenumber}</th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

//Add room Component
export function Addroom() {
  const [name, setname] = useState("");
  const [rentperday, setrentperday] = useState();
  const [maxcount, setmaxcount] = useState();
  const [description, setdescription] = useState();
  const [phonenumber, setphonenumber] = useState();
  const [type, settype] = useState();
  const [imageurl1, setimageurl1] = useState();
  const [imageurl2, setimageurl2] = useState();
  const [imageurl3, setimageurl3] = useState();

  async function addRoom() {
    const newroom = {
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls: [imageurl1, imageurl2, imageurl3],
    };
    try {
      const result = await (
        await axios.post("/api/rooms/addroom", newroom)
      ).data;
      console.log(result);
      Swal.fire('Congratulations','Room added successfully','success')
    } catch (error) {
      console.log(error);
      Swal.fire('Oops','Something went wrong','error')
    }
  }

  return (
    <div>
      <div className="row mt-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Hotel Name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Rent per day"
            value={rentperday}
            onChange={(e) => {
              setrentperday(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Max count"
            value={maxcount}
            onChange={(e) => {
              setmaxcount(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Type"
            value={type}
            onChange={(e) => {
              settype(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Phone Number"
            value={phonenumber}
            onChange={(e) => {
              setphonenumber(e.target.value);
            }}
          />
        </div>

        <div className="col-md-6">
          <textarea
            type="text"
            rows={2}
            style={{ height: "81px" }}
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Image URL 1"
            value={imageurl1}
            onChange={(e) => {
              setimageurl1(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Image URL 2"
            value={imageurl2}
            onChange={(e) => {
              setimageurl2(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Image URL 3"
            value={imageurl3}
            onChange={(e) => {
              setimageurl3(e.target.value);
            }}
          />
        </div>
      </div>
      <div style={{ textAlign: "center" }} className="m-3">
        <button className="btn btn-warning" onClick={addRoom}>
          Add Room
        </button>
      </div>
    </div>
  );
}

export function Users() {
  const [users, setusers] = useState("");
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    return async () => {
      try {
        setloading(true);
        const Data = (await axios.get("/api/users/getallusers")).data;
        setusers(Data);
        setloading(false);
      } catch (error) {
        console.log("Error");
        setloading(false);
        seterror(true);
      }
    };
  }, []);

  return (
    <div>
      <div className="row mt-3">
        <div className="col-md-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>User Id</th>
                <th>Name</th>
                <th>Email Id</th>
                <th>Is Admin</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => {
                  return (
                    <tr>
                      <th>{user._id}</th>
                      <th>{user.name}</th>
                      <th>{user.email}</th>
                      <th>{user.isAdmin ? 'Yes' : 'No'}</th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
