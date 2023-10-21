import React, { useState } from 'react';
import { Avatar, List, Skeleton, DatePicker, Space, Modal, Button, notification, Spin } from 'antd'; // Import Spin
import Map from '../User/Driver/Map/Map';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AvailableDrivers() {
    const [dateSelected, setDateSelected] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentDriver, setCurrentDriver] = useState({trip_Id: 0});
    const [data, setData] = useState([]);
    const [shareCarModalVisible, setShareCarModalVisible] = useState(false);
    const navigate = useNavigate();
    const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
    const [loading, setLoading] = useState(false); // New loading state

    if (!isLoggedIn) {
      navigate("/auth");
    }
    
    const [api, contextHolder] = notification.useNotification();

    const onChange = async (date, dateString) => {
        setLoading(true); // Set loading to true before fetching
        const queryParams = {
            auth: {
                app_token: process.env.REACT_APP_TOKEN
            },
            data: {
                date: dateString
            }
        }

        const YOUR_TOKEN = localStorage.getItem('token');
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/trip/list`, queryParams, {
            headers: {
                'Authorization': `Bearer ${YOUR_TOKEN}`
            }
        });
        
        setData(response.data.data);
        setLoading(false); // Set loading to false after fetching

        if (response.data.data) {
            setDateSelected(true);
        }
    };

    const showModal = (item) => {
        setCurrentDriver(item);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    const showShareCarModal = (item) => {  
      setCurrentDriver(item)
        setShareCarModalVisible(true);
    };

    const handleShareCarModalClose = () => {
        setShareCarModalVisible(false);
    };

    const handleShareCarModalOkay = async () => {
      const queryParams = {
        auth: {
            app_token: process.env.REACT_APP_TOKEN
        },
        data: {
            trip: currentDriver.trip_id
        }
    }

    const YOUR_TOKEN = localStorage.getItem('token');
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/booking/new`, queryParams, {
        headers: {
            'Authorization': `Bearer ${YOUR_TOKEN}`
        }
        });

        if (response.status == 200) {
          openNotification();
          setShareCarModalVisible(false);
        }
       
    };

    const centerStyle = {
        margin: "1rem 1rem 2rem 0rem",
            display: "flex",
            justifyContent: "center"
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

    return (
      <>
      {contextHolder}
      <div style={{margin: "1rem 1rem 2rem 0rem", display: "flex", justifyContent: "center"}}>
          <DatePicker onChange={onChange} />
      </div>

      {loading && <Spin style={{display: "block", margin: "2rem auto"}} />} {/* Display spinner if loading */}

      {!dateSelected && !loading && <p style={{textAlign: "center", marginTop: "8rem"}}>Please select date you wish to carpools to view available drivers.</p>}

      {dateSelected && (
          <List 
              style={{
                  width: "900px",
                  margin: "auto"
              }}
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item, index) => (
                  <List.Item actions={[ <Button danger key={item.driver.id} type='text' onClick={() => showModal(item)}>Driver's Route</Button>,  <Button ghost type='primary' key="list-loadmore-more" onClick={() =>showShareCarModal(item)}>Share Car</Button> ]}>
                      <List.Item.Meta
                          avatar={<Avatar src={`https://th.bing.com/th/id/OIP.AkKR5-4AJhHTNNDMp0NxvQAAAA?pid=ImgDet&rs=1`} />}
                          title={item.driver.name}
                          description={<span dangerouslySetInnerHTML={{ __html: `Address: ${item.driver.address} <br>Drive Time on Road: ${item.departure_time} <br> Pickup Time: ${item.estimated_pickup_time} <br> Seats Left: ${item.available_seats}` }} />}
                      />
                  </List.Item>
              )}
          />
      )}

        <Modal
          visible={isModalVisible}
          width={800}
          footer={[
            <Button key={currentDriver.trip_Id + Math.random()}  onClick={handleModalClose}>Close Map</Button>
          ]}
          closable={false}
        >
         <Map tripId={currentDriver.trip_id} />
        </Modal>

        <Modal 
          title="Share Car"
          visible={shareCarModalVisible}
          onOk={handleShareCarModalOkay}
          onCancel={handleShareCarModalClose}
          okText="Yes"
          cancelText="No"
        >
          <p>Are you sure you want to share your car with this driver?</p>
        </Modal>
      </>
    );
}

export default AvailableDrivers;
