import GoogleMapReact from 'google-map-react';
import Market from 'google-map-react';

import { Marker } from "google-map-react"

const Location = (props) => {
                                           
    const { distance, lat, lng, posInt, fn } = props


    const renderMarkers = (map, maps) => {
        let marker = [new maps.Marker({
          position: { lat, lng },
          map,
          title: 'Mi Ubicacion',
          icon: { 
            url: './male-solid.png'
        }
        })
        ,
        new maps.Marker({
            position: { lat : posInt.Latitud, lng: posInt.Longitud },
            map,
            title: 'Bus',
            icon: { 
                url: './bus-solid.png'
            }
          })
        ];
      }

    
    return (        
            <>
                <div className="card mt-5">                 
                    
                    <p className="pl-2">Ubicacion actual: <span className="h6">{distance.data.address}</span></p>
                    <p className="pl-2">Ditancia hasta aqui: <span className="h6">{distance.data.distancia}</span></p>
                    <p>Tiempo hasta aqui: <span className="h6">{distance.data.tiempo}</span></p>
                    <p><button onClick={fn} className='btn btn-sm btn-primary'>Actualizar <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
  <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
</svg></button></p>
                </div>
                <div className="card mt-5 mb-5" style={{ height: '100%', width: '100%' }}>
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyBMWxzUoadM_CcbqLBeqGp2xMYfSjyMJ-M' }}
                    defaultCenter={{ lat, lng }}
                    defaultZoom={12}
                    onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps)}
                    >

                    </GoogleMapReact>
                </div>            
            </>
    )
}

export default Location