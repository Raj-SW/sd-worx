import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapFeature,
  AzureMapLayerProvider,
  AzureMapsProvider,
  AzureMapPopup,
} from 'react-azure-maps';
import { data } from 'azure-maps-control';
import { useNavigate } from 'react-router-dom';


let pointId = 0;

const option = {
  authOptions: {
    authType: 'subscriptionKey',
    subscriptionKey: process.env.REACT_APP_AZURE_MAPS_KEY,
  }, 
  center: [57.57649211607269, -20.260506221904897],
  zoom: 8,
  view: 'Auto',
};

const renderPoint = (point) => {
    const rendId = pointId++;
    return (
      <AzureMapFeature
        key={rendId}
        id={rendId.toString()}
        type="Point"
        coordinate={point.coordinates}
        properties={{
          id: rendId,
          passengerName: point.name,
          pickupTime: point.pickupTime,
        }}
      />
    );
};





const Map= ({tripId}) => {
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [renderKey, setRenderKey] = useState(Math.random());
    const [popupOptions, setPopupOptions] = useState({});
    const [popupProperties, setPopupProperties] = useState({});
    const [points, setPoints] = useState([]);
    const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
    const navigate = useNavigate();

    if (!isLoggedIn) {
      navigate("/auth")
    }

    useEffect(() => {
      const queryParams = {
        auth: {
            app_token: process.env.REACT_APP_TOKEN
        },
        data: {
            trip_id: tripId
        }
    }
      const YOUR_TOKEN = localStorage.getItem('token');
       axios.post(`${process.env.REACT_APP_API_URL}/trip/pickups`, queryParams, {
          headers: {
              'Authorization': `Bearer ${YOUR_TOKEN}`
          }
          }).then (response => {
            setRouteCoordinates(response.data.data.coordinates)
            setRenderKey(Math.random());
            const pts = response.data.data.users.map((p) => {
              return {
                coordinates: [p.coordinates.long, p.coordinates.lat],
               name: p.name,
              pickupTime: p.pickup_time
              }
            });
            setPoints(pts);
          });
    }, [tripId]);

  return (
    <div style={wrapperStyles.map}>
      <AzureMapsProvider  key={renderKey}>
        <div style={wrapperStyles.map}>
          <AzureMap options={option}>
            <AzureMapDataSourceProvider
              id={'routeExample AzureMapDataSourceProvider'}
              options={{
                lineMetrics: true,
              }}
              
            >
              <AzureMapLayerProvider
    id={'routeExample AzureMapLayerProvider'}
    options={{
      strokeWidth: 5,
      strokeColor: 'blue',
    }}
    lifecycleEvents={{
      layeradded: (e) => {
      },
    }}
    type={'LineLayer'}
/>

<AzureMapLayerProvider
    id={'pointLayer'}
    options={{
      iconOptions: {
        image: 'pin-red',
      }
    }}
    type={'SymbolLayer'}
    events={{
        mousemove: (e) => {
            if (e.shapes && e.shapes.length > 0 && e.shapes[0].properties) {
                const prop = e.shapes[0].properties;
                setPopupOptions({
                    position: new data.Position(
                        e.shapes[0].geometry.coordinates[0],
                        e.shapes[0].geometry.coordinates[1],
                    ),
                    pixelOffset: [0, -18] 
                });
                
                setPopupProperties({
                    passengerName: prop.passengerName,
                    pickupTime: prop.pickupTime,
                });
            } else {
                setPopupOptions({});
                setPopupProperties({});
            }
        },
    }}
/>


{points.map((marker) => renderPoint(marker))}
               <AzureMapFeature
                 key={'Line String Feature'}
                 id={'Line Strign ID'}
                 type={'LineString'}
                coordinates={routeCoordinates}
                />
            </AzureMapDataSourceProvider>
            <AzureMapPopup
    isVisible={!!popupProperties.passengerName}
    options={popupOptions}
    popupContent={
        <div style={wrapperStyles.container}>
        {popupProperties.passengerName}  - 
        <span style={wrapperStyles.time}> {popupProperties.pickupTime}</span>
      </div>
    }
/>
          </AzureMap>
        </div>
      </AzureMapsProvider>
    </div>
  );
};

export const wrapperStyles = {
  map: {
    height: '350px',
  },
  wrapper: {
    padding: '15px',
    marginTop: '15px',
  },
  buttonContainer: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: '10px',
    gridAutoColumns: 'max-content',
    padding: '10px 0',
  },
  buttons: {
    padding: '15px',
    flex: 1,
  },
  popupStyles: {
    padding: '20px',
    color: 'black',
  },
  container: {
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold'
},
time: {
    color: 'blue',
    fontWeight: 'bold'
}
};

export default Map;
