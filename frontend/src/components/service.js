import { useEffect, useState } from 'react'


const Service = (props) => {
    const {id, nombre, hcitacion, hsalida, hllegada, origen, interno} = props.servicio

    const [ posUser, setPosUser] = useState({})
    const [ state, setState] = useState(false)

    const getLocation = () => {

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
                                }
                                
    }

    useEffect(() => {
        getLocation()
        console.log('ejecuto effect')

    }, [props])

    console.log(posUser);
    
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