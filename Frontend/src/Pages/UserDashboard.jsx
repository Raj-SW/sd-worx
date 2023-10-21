import React, { useState, useEffect } from "react";
import "./UserDashboard.css";
import axios from 'axios';
import { Avatar, List, Skeleton, DatePicker, Space, Modal, notification } from 'antd';
import { Form, Row, Col, Input, Button, TimePicker } from 'antd';

export const CreateTrip = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState("");
  const [trips, setTrips] = useState([]);

  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    try {
      var dateValue = new Date(values.date).toISOString().split('T')[0];
      var timeValue = values.time.format('HH:mm');
      console.log(dateValue, timeValue)
      const queryParams = {
        auth: {
          app_token: process.env.REACT_APP_TOKEN
        },
        data: {
          driver: JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id,
          date: dateValue,
          departure_time: timeValue,
          available_seats: values.seats,
          available_for_carpool: "true"
        }
      }
      const YOUR_TOKEN = localStorage.getItem('token');

      const response = await axios.post('http://localhost:3550/v1/trip/new', queryParams, {
        headers: {
          'Authorization': `Bearer ${YOUR_TOKEN}`
        }
      });

      if(response.status == 200) {
        form.resetFields();
        loadCreatedTrips(); 
      }

      notification.success({
        message: 'Success',
        description: 'Trip created successfully.',
      });
      openNotification();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // For handling date
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e, stringDate) => {
    console.log(stringDate)
    setSelectedDate(stringDate);
  };

  // For handling time input
  const [selectedTime, setSelectedTime] = useState("");

  const handleTimeChange = (e) => {
  };

  // For handling number of seats
  const [selectedNumber, setSelectedNumber] = useState("");

  const handleNumberChange = (e) => {
    setSelectedNumber(e.target.value);
  };
  const [api, contextHolder] = notification.useNotification();

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
    <>
    <div className="CreateTrip-wrapper">
      <div className="create-trip-container">
        <Form
          form={form}
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Row gutter={16} align="middle">
            <Col xs={24} sm={6}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: 'Please select a date!' }]}
              >
                <DatePicker  />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item
                label="Time"
                name="time"
                rules={[{ required: true, message: 'Please select a time!' }]}
              >
                <TimePicker format="HH:mm"  />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item
                label="Seats"
                name="seats"
                rules={[
                  { required: true, message: 'Please enter the number of seats!' },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Create Trip
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>


      <List
        style={{
          width: "900px",
          margin: "auto"
        }}
        itemLayout="horizontal"
        dataSource={trips}
        renderItem={(item, index) => (
          <List.Item actions={[<Button danger key={item.driver.id} type='text'>Driver's Route</Button>]}>
            <List.Item.Meta
              avatar={<Avatar src={`https://th.bing.com/th/id/OIP.AkKR5-4AJhHTNNDMp0NxvQAAAA?pid=ImgDet&rs=1`} />}
              title={item.driver.name}
              description={<span dangerouslySetInnerHTML={{
                __html: `Address: ${item.driver.address} <br>Drive Time on Road: ${item.departure_time} <br> Passengers: ${item.passengers} <br> Seats Left: ${item.available_seats
                  }`
              }} />}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default CreateTrip;
