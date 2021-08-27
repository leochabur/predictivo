import { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from './spinner';
import Location from './locatios';

const Service = (props) => {
    const {id, nombre, hcitacion, hsalida, hllegada, origen, interno} = props.servicio

    const [ posUser, setPosUser] = useState({})
    const [ posInterno, setPosInterno] = useState({})

    const [ loading, setLoading ] = useState(false)

    const [ distance, setDistance] = useState(null)

    const getLocation = async () => {
                                    setLoading(true)
                                    if (!navigator.geolocation) 
                                    {
                                        setLoading(true)
                                    } 
                                    else 
                                    {
                                     
                                        navigator.geolocation.getCurrentPosition(({ coords }) => {                                                                                                        
                                                                                                        setPosUser({ lat :coords.latitude, lon : coords.longitude });  
                                                                                                 }, 
                                                                                                 () => {
                                                                                                        
                                                                                                 });
                                        const { data }  = await axios('http://dev-masterbus.tech:8000/api/consultas/position/'+interno);
                                        const { ApiGetLocationByVehicleResult } = data;
                                        if (ApiGetLocationByVehicleResult.RespuestaOk)
                                        {
                                            const { Resultado } = ApiGetLocationByVehicleResult
                                            setPosInterno({ lat : Resultado.Latitud, lon : Resultado.Longitud })
                                            distancia()                                            
                                        }
                                        else
                                        {
                                            console.log('nook '+interno)
                                        }
                                    }                           
    }

    useEffect(() => {
        getLocation()
        console.log('ejecuto effect')

    }, [props])

    const distancia = async () => {
        setLoading(false)
        const distance = await axios.post('http://localhost:8000/api/consultas/distance',
                                         {
                                            latuser : posUser.lat,
                                            longuserm : posUser.lon, 
                                            latinterno : posInterno.lat, 
                                            longinterno : posInterno.lon
                                         });
        setDistance(distance)
    }

    return (
                <>
                    <div className="card">
                        <h5 className="card-header">{ nombre }</h5>
                        <div className="card-body">
                            <p>Salio de: <span className="h5">{ origen }</span> a las: <span className="h5">{ hcitacion }</span></p>
                            <p>Interno: <span className="h5">{ interno } </span></p>
                        </div>
                    </div>
                    {
                        loading 
                                ? <Spinner/>
                                : <Location interno={interno} distance={distance} />
                                  
                    }
                    
                </>
            );
}

export default Service;