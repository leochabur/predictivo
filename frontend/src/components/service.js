import { useEffect } from 'react'
import { soap } from 'node-soap'

const Service = (props) => {

    const {id, nombre, hcitacion, hsalida, hllegada, origen, interno} = props.servicio

    useEffect(() => {
        
        var url = 'https://app.urbetrack.com/App_services/Operation.asmx?wsdl';
        var args = {usuario: 'masterbus_trafico', hash: '85CF3EC9C355539B74F36AB7D03BBC1C', interno};

    }, [props])

    
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