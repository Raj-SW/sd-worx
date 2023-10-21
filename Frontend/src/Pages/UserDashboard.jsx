import React, { useState, useEffect } from "react";
import "./UserDashboard.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import axios from 'axios';
import { Avatar, List, Skeleton, DatePicker, Space, Modal, notification } from 'antd';

export const CreateTrip = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState("");
  const [trips, setTrips] = useState([]);

  // For handling date
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // For handling time input
  const [selectedTime, setSelectedTime] = useState("");

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  // For handling number of seats
  const [selectedNumber, setSelectedNumber] = useState("");

  const handleNumberChange = (e) => {
    setSelectedNumber(e.target.value);
  };
  const [api, contextHolder] = notification.useNotification();


  const handleCreateTrip = async (e) => {
    e.preventDefault();

    try {

      const queryParams = {
        auth: {
          app_token: process.env.REACT_APP_TOKEN
        },
        data: {
          driver: JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id,
          date: selectedDate,
          departure_time: selectedTime,
          available_seats: selectedNumber,
          available_for_carpool: "true"
        }
      }
      const YOUR_TOKEN = localStorage.getItem('token');

      const response = await axios.post('http://localhost:3550/v1/trip/new', queryParams, {
        headers: {
          'Authorization': `Bearer ${YOUR_TOKEN}`
        }
      });


      // Handle the response as needed
      console.log('Server response:', response.data);

      notification.success({
        message: 'Success',
        description: 'Trip created successfully.',
      });
      openNotification();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const openNotification = () => {
    api.open({
      message: 'Success!!!',
      description:
        'you will be carpooling with this driver.',
      duration: 5,
      type: 'success',
    });
  };

  const loadCreatedTrips = () => {

    try {

      const queryParams = {
        auth: {
          app_token: process.env.REACT_APP_TOKEN
        },
        data: {
          driver_id: JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id,
        }
      }
      const YOUR_TOKEN = localStorage.getItem('token');

      axios.post('http://localhost:3550/v1/trip/search', queryParams, {
        headers: {
          'Authorization': `Bearer ${YOUR_TOKEN}`
        }
      }).then(response => {
        // Handle the response as needed
        console.log('Server response:', response.data);
        setTrips(response.data.data)
      })




    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    loadCreatedTrips()
  }, [])

  return (
    <div className="CreateTrip-wrapper">
      <div className="create-trip-container">
        <Form className="">
          <Row className="align-items-center px-3 py-3">
            <Col xs="auto" className="px-3">
              <Form.Label htmlFor="inlineFormInput">Date</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                placeholder="Date"
              />
            </Col>
            <Col xs="auto" className="px-3">
              <Form.Label htmlFor="inlineFormInputGroup">Time</Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  id="inlineFormInputGroup"
                  type="time"
                  value={selectedTime}
                  onChange={handleTimeChange}
                />
              </InputGroup>
            </Col>
            <Col xs="auto" className="px-3">
              <Form.Label htmlFor="inlineFormInput">Seats</Form.Label>
              <Form.Control
                type="number"
                value={selectedNumber}
                onChange={handleNumberChange}
              />
            </Col>
            <Col xs="auto" className="px-3">
              <div className="UDB-btn">
                <button className="vvd" onClick={handleCreateTrip}><span>Create Trip</span></button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>


      <List
        style={{
          width: "900px",
          margin: "auto"
        }}
        itemLayout="horizontal"
        dataSource={trips}
        renderItem={(item, index) => (
          <List.Item actions={[<Button danger key={item.driver.id} type='text'>Driver's Route</Button>, <Button ghost type='primary' key="list-loadmore-more" >Share Car</Button>]}>
            <List.Item.Meta
              avatar={<Avatar src={`https://th.bing.com/th/id/OIP.AkKR5-4AJhHTNNDMp0NxvQAAAA?pid=ImgDet&rs=1`} />}
              title={item.driver.name}
              description={<span dangerouslySetInnerHTML={{
                __html: `Address: ${item.driver.address} <br>Drive Time on Road: ${item.departure_time} <br> Pickup Time: ${item.estimated_pickup_time} <br> Seats Left: ${item.available_seats
                  }`
              }} />}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default CreateTrip;
{
  /* <form onSubmit={handleSubmit} className="">
  <div className="date-container">
    <label htmlFor="date">Date: </label>
    <input
      type="date"
      value={selectedDate}
      onChange={handleDateChange}
      placeholder="Date"
    />
  </div>
  <div className="time-container">
    <label htmlFor="time">Enter Time</label>
    <input
      type="time"
      value={selectedTime}
      onChange={handleTimeChange}
    />
  </div>
  <div className="seats-wrapper">
    <label htmlFor="seats">Enter Seats available:</label>
    <input
      type="number"
      value={selectedNumber}
      onChange={handleNumberChange}
    />
  </div>
  <button type="submit">Add trip</button>
</form> */
}
