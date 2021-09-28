import { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from './spinner';
import SelectServicios from './select'


const Precarga = () => {
    const [ servicios, setServicios] = useState({});
    const [loading, setLoading] = useState(true);  

    const recuperarServicios = async () => {
        const { data } = await axios('https://dev-masterbus.tech:8000/api/consultas/ordenesnow/10');
        setServicios(data);
        setLoading(false);
    }

    useEffect(() => {
        recuperarServicios();
    }, []);


    return (
            <>                
                <div className="row mt-2">                  
                            {   
                                loading ?
                                        <Spinner/>
                                        :
                                        <SelectServicios servs={ servicios }/> 
                            }                            
                </div>
            </>
            
        
    );
  }

  export default Precarga;