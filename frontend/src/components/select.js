import { useState, useEffect } from 'react'
import axios from 'axios'
import Service from './service';
import Spinner from './spinner';



function SelectServicios() {

    const [ servicios, setServicios] = useState([]);
    const [serv, setServ] = useState(null);

    const recuperarServicios = async () => {
        const { data } = await axios('http://dev-masterbus.tech:8000/api/consultas/ordenesnow/13');
        setServicios(data)
        
    }

    useEffect(() => {
        recuperarServicios()
    }, []);


    const handleChange = ({ target }) => {
            const s = servicios.find(element => element.id == target.value);
            setServ(s)
    }
    
    console.log(servicios)
    

    return (
            <>
                <div className="row mt-5">
                    <div className="col-lg-6">
                        <select className="form-control form-select" onChange={ handleChange }>
                            <option key='0' value='0'>Seleccione un servicio</option>
                            { 
                                servicios.map((srv) => {
                                                            return <option key={ srv.id } value={ srv.id }>{ srv.nombre.toUpperCase() }</option>
                                                        }) 
                            }
                            
                
                        </select>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-lg-6">                     
                            {   
                                serv ?
                                        <Service servicio={ serv }/>
                                        :
                                        ''

                            }                            
                    </div>
                </div>
            </>
            
        
    );
  }

  export default SelectServicios;
  