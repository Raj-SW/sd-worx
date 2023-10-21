import React, { useState } from 'react';
import { Avatar, List, DatePicker, Modal, Button, notification } from 'antd';
import Map from '../User/Driver/Map/Map'

function CarPooledDays() {
    const [dateSelected, setDateSelected] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [api, contextHolder] = notification.useNotification();

    const data = [
        {
          title: 'Ant Design Title 1',
        },
        {
          title: 'Ant Design Title 2',
        },
        {
          title: 'Ant Design Title 3',
        },
        {
          title: 'Ant Design Title 4',
        },
      ];

      const onChange = (date, dateString) => {
        console.log(date, dateString);
        if (date) {
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
        {contextHolder}
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
                  description={<span dangerouslySetInnerHTML={{ __html: "Driver: Ashwin <br> Destination: Office<br>Pickup Time: 08:00" }} />}
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
