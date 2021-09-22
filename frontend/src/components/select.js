import { useState, useEffect } from 'react'
import axios from 'axios'
import Service from './service';



function SelectServicios( props) {

    const { servs } = props;

    const [serv, setServ] = useState(null);

    const [ posUser, setPosUser] = useState({});

    const [status, setStatus] = useState({});



    const getLocation = async () => {
        if (!navigator.geolocation) 
        {
          setStatus({ ok : false, message : 'Geolocation no soportada por su navegador'});
        } 
        else 
        {
          navigator.geolocation.getCurrentPosition((position) => {
              console.log('mi posicion actual ',position);
            setStatus({ ok : true, message : '' });
            setPosUser({Lat: position.coords.latitude, Lon :position.coords.longitude});
            if (!(position.coords.latitude && position.coords.longitude))
            {
                setStatus({ ok : false, message : 'No se pudo recuperar su ubicacion' });
            }
          }, () => {
            setStatus({ ok : false, message : 'No se pudo recibir su uicacion' });
          });
        }
        //const { data } = await axios.get('https://get.geojs.io/v1/ip/geo.json');
      //  setPosUser({ lat :data.latitude, lon : data.longitude });             
                               
    }

    useEffect(() => {
        getLocation();
    }, []);


    const handleChange = ({ target }) => {
            const s = servs.find(element => element.id == target.value);
            setServ(s)
    }
    
    const styleObj = {
      fontSize: 12,
      color: "grey",
      paddingTop: "5px",
  }
    return (
            <>
                <div className="row mt-5">
                    <div className="col-lg-6 col-sm-12">
                        <select className="form-control form-select" style={styleObj} onChange={ handleChange }>
                            <option key='0' value='0'>Seleccione un servicio</option>
                            { 
                                servs.map((srv) => {
                                                            return <option key={ srv.id } value={ srv.id }>{ srv.nombre.toUpperCase() }</option>
                                                        }) 
                            }
                            
                
                        </select>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-lg-6 col-sm-12">                     
                            {   
                                serv ?
                                        <Service servicio={ serv } position={ posUser }/>
                                        :
                                        <h5>Seleccione un servicio</h5>

                            }                            
                    </div>
                </div>
            </>
            
        
    );
  }

  export default SelectServicios;
  