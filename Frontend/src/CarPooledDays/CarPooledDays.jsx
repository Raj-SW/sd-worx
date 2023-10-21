import React, { useState } from 'react';
import { Avatar, List, DatePicker, Modal, Button, notification } from 'antd';
import Map from '../User/Driver/Map/Map'
import axios from 'axios';

function CarPooledDays() {
  const [dateSelected, setDateSelected] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setData] = useState([]);

    const onChange = async (date, dateString) => {
      const queryParams = {
          auth: {
              app_token: process.env.REACT_APP_TOKEN
          },
          data: {
              date: dateString
          }
      }

      const YOUR_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXRsZSI6ImFjY2VzcyIsImlkIjoiNjUzMzAzOTM4MjZiNzA4MGE0ODllZGMzIiwiZW1haWwiOiJjaGF2aUBwYXgxLmNvbSIsImlhdCI6MTY5Nzg0MjU4OSwiZXhwIjoxNjk3OTI4OTg5fQ.NSx5cD5XqUhvMtazC9oaUwgLRtiqOQt8V0ltevRP4NA";
      const response = await axios.post('http://localhost:3550/v1/booking/list', queryParams, {
          headers: {
              'Authorization': `Bearer ${YOUR_TOKEN}`
          }
          });
          console.log(response.data.data)
      setData(response.data.data)
      
      if (response.data.data) {
          setDateSelected(true);
      }
  };

    const showModal = (item) => {  
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    const centerStyle = {
        margin: "1rem 1rem 2rem 0rem",
            display: "flex",
            justifyContent: "center"
    };

    return (
        <>
        <div style={centerStyle}>
            <DatePicker onChange={onChange} />
        </div>
        {!dateSelected && <p style={{textAlign: "center", marginTop: "8rem"}}>Please select date you wish to view your carpooling details.</p>}

        {dateSelected && (
            <List 
            style={{
                width: "900px",
                margin: "auto"
            }}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item actions={[ <Button danger  key="list-loadmore-edit" type='text' onClick={() => showModal(item)}>Driver's Route</Button> ]}>
                <List.Item.Meta
                  avatar={<Avatar src={`https://th.bing.com/th/id/OIP.AkKR5-4AJhHTNNDMp0NxvQAAAA?pid=ImgDet&rs=1`} />}
                  title={item.title}
                  description={<span dangerouslySetInnerHTML={{ __html: `Driver: ${item.driver.name} <br> Destination: Office<br>Pickup Time: ${item.estimated_pickup_time}` }} />}
                />
              </List.Item>
            )}
          />
        )}

        <Modal
          visible={isModalVisible}
          width={800}
          footer={[
            <Button defaultColor='#f8ad07'  onClick={handleModalClose}>Close Map</Button>
          ]}
          closable={false}
        >
         <Map />
        </Modal>
      </>
    );
}

export default CarPooledDays;
