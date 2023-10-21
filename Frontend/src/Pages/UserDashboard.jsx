import React, { useState, useEffect } from "react";
import "./UserDashboard.css";
import axios from 'axios';
import { Avatar, List, Skeleton, DatePicker, Space, Modal, notification } from 'antd';
import { Form, Row, Col, Input, Button, TimePicker } from 'antd';
import Map from '../User/Driver/Map/Map'

export const CreateTrip = () => {
  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTrip] = useState({trip_Id: 0});
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleFinish = async (values) => {
    try {
      var dateValue = new Date(values.date).toISOString().split('T')[0];
      var timeValue = values.time.format('HH:mm');
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

      const response = await axios.post('${process.env.REACT_APP_API_URL}/trip/new', queryParams, {
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

      axios.post(`${process.env.REACT_APP_API_URL}/trip/search`, queryParams, {
        headers: {
          'Authorization': `Bearer ${YOUR_TOKEN}`
        }
      }).then(response => {
        // Handle the response as needed
        setTrips(response.data.data)
      })




    } catch (error) {
      console.error('Error:', error);
    }
  };

  const showModal = (item) => {
    setCurrentTrip(item);
    setIsModalVisible(true);
};

const handleModalClose = () => {
    setIsModalVisible(false);
};


  useEffect(() => {
    loadCreatedTrips()
  }, [])

  return (
    <>
    <div style={{marginTop: "3rem"}} className="CreateTrip-wrapper">
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
          <List.Item actions={[<Button danger  onClick={() => showModal(item)} key={item.driver.id} type='text'>Driver's Route</Button>]}>
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

        <Modal
          visible={isModalVisible}
          width={800}
          footer={[
            <Button key={currentTrip.trip_Id + Math.random()}  onClick={handleModalClose}>Close Map</Button>
          ]}
          closable={false}
        >
         <Map tripId={currentTrip.id} />
        </Modal>
    </>
  );
};

export default CreateTrip;
