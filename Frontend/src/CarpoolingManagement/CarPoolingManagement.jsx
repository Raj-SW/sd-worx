import React, { useState } from 'react';
import { Tabs } from 'antd';
import AvailableDrivers from '../AvailableDriver/AvailableDriver';
import CarPooledDays from '../CarPooledDays/CarPooledDays';

function CarPoolingManagement() {


    const centerStyle = {
        margin: "8rem 1rem 2rem 0rem",
            display: "flex",
            justifyContent: "center"
    };

    const onChange = (key) => {
      console.log(key);
    };

    return (
      <Tabs
      onChange={onChange}
      style={{marginTop: "7.5rem", marginLeft: "2rem"}}
      type="card"
      items={new Array(2).fill(null).map((_, i) => {
        console.log(i)
        const children = i  == 0 ? <AvailableDrivers /> : <CarPooledDays />;
        const title = i == 0 ? "Available Drivers" : "Car Pooled Days";
        return {
          label: title,
          key: i,
          children: children,
        };
      })}
    />
    );
}

export default CarPoolingManagement;
