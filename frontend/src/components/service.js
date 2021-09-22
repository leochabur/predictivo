import { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from './spinner';
import Location from './locatios';

const Service = (props) => {

    const {id, nombre, hcitacion, conductor, hsalida, hllegada, origen, interno} = props.servicio

    const posUserlat = props.position.Lat

    const posUserlon = props.position.Lon

    const [ loading, setLoading ] = useState(false)

    const [ distance, setDistance] = useState(null)



    useEffect(() => {
        posicionActual()       

    }, [props])

    const posicionActual = async () => {
        setLoading(true)

        const { data }  = await axios('https://dev-masterbus.tech:8000/api/consultas/position/'+interno);
        const { ApiGetLocationByVehicleResult } = data;
        if (!ApiGetLocationByVehicleResult.RespuestaOk)
        {     
          return;                                    
        }       

        const { Resultado } = ApiGetLocationByVehicleResult
        distancia(Resultado.Latitud, Resultado.Longitud)  
    }


    const distancia = async (lat, long) => {
       // console.log('Posicion Interno ', lat, '   ', long, '  Mi Posicion ', posUserlat,' ', posUserlon)
        const distance = await axios.post('https://dev-masterbus.tech:8000/api/consultas/distance',
                                         {
                                            latinterno : posUserlat, 
                                            longinterno : posUserlon,
                                            latuser : lat,
                                            longuserm : long,                                             
                                         });
        setDistance(distance)
        setLoading(false)
    }

    return (
                <>
                    <div className="card">
                        <h5 className="card-header">{ nombre }</h5>
                        <div className="card-body">
                            <p>Salio de: <span className="h5">{ origen }</span> a las: <span className="h5">{ hcitacion }</span></p>
                            <p>Interno: <span className="h5">{ interno } </span></p>
                            <p>Conductor: <span className="h5">{ conductor } </span></p>
                        </div>
                    </div>
                    {
                        loading 
                                ? <Spinner mensaje='Calculando distancia....por favor aguarde.'/>
                                : 
                                    distance 
                                            ? <Location interno={interno} distance={distance} />
                                            : ''
                                  
                    }
                    
                </>
            );
}

export default Service;