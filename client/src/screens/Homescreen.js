import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import { DatePicker } from "antd";
import moment from "moment";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';


dayjs.extend(customParseFormat);

function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState();
  const [searchkey, setsearchkey] = useState();
  const [type, settype] = useState("all");

  const { RangePicker } = DatePicker;
  const size = 'large';

  const disabledDate = (current) => {
    return current && current < dayjs().startOf('day');
  };

console.log(error);
  useEffect(() => {
    return async () => {
      try {
        setloading(true);
        const roomData = (await axios.get("/api/rooms/getallrooms")).data;
        setduplicaterooms(roomData);
        setrooms(roomData);
        setloading(false);
      } catch (error) {
        console.log("Error");
        setloading(false);
        seterror(true);
      }
    };
  }, []);

  function filterbydate(dates) {
    if (dates) {
      setfromdate(moment(dates[0].$d).format("DD-MM-YYYY"));
      settodate(moment(dates[1].$d).format("DD-MM-YYYY"));

      var temproom = [];
      var availability = false;
      for (const room of duplicaterooms) {
        if (room.currentbookings.length > 0) {
          for (const booking of room.currentbookings) {
            if (
              !moment(moment(dates[0].$d).format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              ) &&
              !moment(moment(dates[1].$d).format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              )
            ) {
              if (
                moment(dates[0].$d).format("DD-MM-YYYY") !== booking.fromdate &&
                moment(dates[0].$d).format("DD-MM-YYYY") !== booking.todate &&
                moment(dates[1].$d).format("DD-MM-YYYY") !== booking.fromdate &&
                moment(dates[1].$d).format("DD-MM-YYYY") !== booking.todate
              ) {
                availability = true;
              }
            }
          }
        }
        if (availability === true || room.currentbookings.length === 0) {
          temproom.push(room);
        }
      }
      setrooms(temproom);
    }
  }

  function filterBySearch() {
    const temprooms = duplicaterooms.filter((room) =>
      room.name.toLowerCase().includes(searchkey.toLowerCase())
    );
    setrooms(temprooms);
  }
  function filterByType(e) {
    settype(e)
    if (e !== "all") {
      const temprooms = duplicaterooms.filter(
        (room) => room.type.toLowerCase() === e.toLowerCase()
      );
      setrooms(temprooms);
    } else {
      setrooms(duplicaterooms);
    }
  }

  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-3">
            <RangePicker size={size} format={"DD-MM-YYYY"} onChange={filterbydate} disabledDate={disabledDate} />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search Rooms"
            value={searchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="deluxe">Deluxe</option>
            <option value="classic">Classic</option>
          </select>
        </div>
      </div>
      <div className="row justify-content-center mt-2 ">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-2">
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
