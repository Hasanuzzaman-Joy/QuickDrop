import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const FlyToDistrict = ({coords}) =>{
    const map = useMap();

    if(coords){
        map.flyTo(coords,12,{duration:2})
    }

    return null;
}

const CoverageMap = ({flyCoords,coverageData}) => {

    return (
        <MapContainer zoom={7.5} center={[23.685, 90.3563]} className="h-[400px] w-full rounded-lg">
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FlyToDistrict coords={flyCoords} />
            {
                coverageData.map((center, index) => <>
                    <Marker key={index} position={[center.latitude, center.longitude]} eventHandlers={{
                        mouseover: (e) => {
                            e.target.openPopup();
                        },
                        mouseout: (e) => {
                            e.target.closePopup();
                        },
                    }} >
                        <Popup>
                            <strong>{center.district}</strong><br />
                            Areas: {center.covered_area?.join(', ')}
                        </Popup>
                    </Marker>
                </>)
            }
        </MapContainer>
    );
};

export default CoverageMap;