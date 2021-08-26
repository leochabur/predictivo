

const Service = (props) => {

    const {id, nombre, hsalida, hllegada} = props.servicio
    return (
                <>
                    Servicio: { nombre }
                    Hora Salida: { hsalida }
                </>
    );
}

export default Service;