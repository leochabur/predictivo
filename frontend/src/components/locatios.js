const Location = (props) => {

    const { distance } = props
    return (        
            <>
                <div className="card mt-5">
                    <p>Ubicacion actual: <span className="h6">{distance.data.address}</span></p>
                    <p>Ditancia hasta aqui: <span className="h6">{distance.data.distancia}</span></p>
                    <p>Tiempo hasta aqui: <span className="h6">{distance.data.tiempo}</span></p>
                </div>            
            </>
    )
}

export default Location