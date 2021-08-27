import { useEffect, useState } from 'react'
import axios from 'axios'

const Service = (props) => {
    const {id, nombre, hcitacion, hsalida, hllegada, origen, interno} = props.servicio

    const [ posUser, setPosUser] = useState({})
    const [ posInterno, setPosInterno] = useState({})
    const [ state, setState] = useState(false)

    const getLocation = async () => {

                                    if (!navigator.geolocation) 
                                    {
                                        setState(false);
                                    } 
                                    else 
                                    {
                                        setState(true);
                                        navigator.geolocation.getCurrentPosition(({ coords }) => {
                                                                                                        setState(false);
                                                                                                        setPosUser({ lat :coords.latitude, lon : coords.longitude });  
                                                                                                 }, 
                                                                                                 () => {
                                                                                                        setState(false);
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

    const distancia = () => {
        console.log('interno ',posInterno)
        console.log('usuario ',posUser)
        var config = {
            method: 'get',
            url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+posInterno.lat+','+posInterno.lon+'&destinations='+posUser.lat+','+posUser.lon+'&key=AIzaSyDv8b-qrzRkI9kvtJV6l3Lko-mCdrGh7oE',
            headers: { crossdomain: true }
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
                <>
                    <div className="card">
                        <h5 className="card-header">{ nombre }</h5>
                        <div className="card-body">
                            <p>Salio de: <span className="h5">{ origen }</span> a las: <span className="h5">{ hcitacion }</span></p>
                            <p>Interno: <span className="h5">{ interno } </span></p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </>
            );
}

export default Service;