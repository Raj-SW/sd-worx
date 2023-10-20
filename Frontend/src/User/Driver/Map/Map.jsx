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




  const points = [
    { coordinates: [57.53446305014205, -20.220789655563557], name: 'John', pickupTime: "8:30 AM"  },
    { coordinates: [57.52866531239014, -20.216823114003493], name: 'Alice', pickupTime: "8:30 AM"  },
    { coordinates: [57.52866531239077, -20.216823114003483], name: 'ce', pickupTime: "8:30 AM"  },
    { coordinates: [57.48959774078488, -20.243973593434518], name: 'Bob', pickupTime: "8:30 AM"  },
  ];


let pointId = 0;

const option = {
  authOptions: {
    authType: 'subscriptionKey',
    subscriptionKey: process.env.REACT_APP_AZURE_MAPS_KEY,
  },
  center: ( points.length > 1 ? points[points.length/2].coordinates : points[0].coordinates),
  zoom: 13,
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



const Map= () => {
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [renderKey, setRenderKey] = useState(Math.random());
    const [popupOptions, setPopupOptions] = useState({});
    const [popupProperties, setPopupProperties] = useState({});

    useEffect(() => {
        const queryString = points.map(p => `${p.coordinates[1]},${p.coordinates[0]}`).join(':');
        const params = {
            'api-version': '1.0',
            'subscription-key': option.authOptions.subscriptionKey,
            'query': queryString,
            'travelMode': 'car'
        };
    
        axios.get(`https://atlas.microsoft.com/route/directions/json`, { params })
            .then(response => {
                const legs = response.data.routes[0].legs;
                const points = legs.flatMap(leg => leg.points);
                const routeCoords = points.map(point => [point.longitude, point.latitude]);
                setRouteCoordinates(routeCoords);
                setRenderKey(Math.random());
            })
            .catch(error => {
                console.error('Error fetching route details:', error);
            });
            
    }, []);

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
