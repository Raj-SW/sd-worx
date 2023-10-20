import React, { useState } from 'react';
import { Avatar, List, Skeleton, DatePicker, Space, Modal, Button, notification } from 'antd';
import Map from '../User/Driver/Map/Map'

function AvailableDrivers() {
    const [dateSelected, setDateSelected] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [shareCarModalVisible, setShareCarModalVisible] = useState(false);

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

    const showShareCarModal = () => {  
        setShareCarModalVisible(true);
    };

    const handleShareCarModalClose = () => {
        setShareCarModalVisible(false);
    };

    const handleShareCarModalOkay = () => {
        openNotification();
        setShareCarModalVisible(false);
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
        <div style={centerStyle}>
            <DatePicker onChange={onChange} />
        </div>
        {!dateSelected && <p style={{textAlign: "center", marginTop: "8rem"}}>Please select date you wish to carpools to view available drivers.</p>}

        {dateSelected && (
            <List 
            style={{
                width: "900px",
                margin: "auto"
            }}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item actions={[ <Button danger  key="list-loadmore-edit" type='text' onClick={() => showModal(item)}>Driver's Route</Button>,  <Button ghost type='primary' key="list-loadmore-more" onClick={showShareCarModal}>Share Car</Button> ]}>
                <List.Item.Meta
                  avatar={<Avatar src={`https://th.bing.com/th/id/OIP.AkKR5-4AJhHTNNDMp0NxvQAAAA?pid=ImgDet&rs=1`} />}
                  title={item.title}
                  description={<span dangerouslySetInnerHTML={{ __html: "Address: St Pierre, Moka<br>Time leaving house: 08:00" }} />}
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
