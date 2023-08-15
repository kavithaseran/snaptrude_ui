import {useCallback, useRef, useState} from 'react';
import { GeolocateControl, Map, Marker, NavigationControl, ScaleControl } from 'react-map-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Cube from './Cube';
import './dashboard.css';

const TOKEN = 'pk.eyJ1Ijoia2F2aXRoYXNlcmFuIiwiYSI6ImNsbDZjeTZxNzBva2MzcGtkcXU0bGdkazEifQ.U50t0ZLChi22w8tS5j9uRw';

function Dashboard() {
  const mapRef = useRef();
  const [lngLat, setLngLat] = useState({
    lat: 37.8,
    lng: -122.4
  });
  const initialViewState = {
    latitude: 37.8,
    longitude: -122.4,
    zoom: 5,
    pitch: 10
  };
  const [image, setImage] = useState();

  const onSelectRegion = useCallback((evt) => {
    const longitude = evt.lngLat.lng;
    const latitude = evt.lngLat.lat;
    setLngLat({
      lat: latitude,
      lng: longitude
    })
    mapRef.current?.flyTo({center: [longitude, latitude], duration: 2000});
  }, []);

  const handleCapture = (event) => {
    event.stopPropagation();
    const src = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${lngLat.lng},${lngLat.lat},18/1280x700?access_token=${TOKEN}`;
    setImage(src);
  }

  return (
    <>
        <Map
            ref={mapRef}
            mapboxAccessToken={TOKEN}
            mapLib={import('mapbox-gl')}
            onClick={evt => { 
                setImage();
                onSelectRegion(evt);
            }}
            initialViewState={{...initialViewState}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            <GeolocateControl position="top-left" />
            <NavigationControl position="top-left"showCompass={false}/>
            <ScaleControl />
            <Marker latitude={lngLat.lat} longitude={lngLat.lng}>
                <FontAwesomeIcon icon={faMapMarkerAlt} className='marker-icon' />
                <div className='marker-text-div' onClick={handleCapture}>Click here to capture!</div>
            </Marker>
        </Map>
        {image && <Cube src={image} />}
    </>
  );
}

export default Dashboard;
