const Location = (props) => {

    const { distance } = props
    return (        
            <>
                <div className="card mt-5">
                    <p>Ubicacion actual: <span className="h6">{distance.data.address}</span></p>
                    <p>Ditancia hasta aqui: <span className="h6">{distance.data.distancia}</span></p>
                    <p>Tiempo hasta aqui: <span className="h6">{distance.data.tiempo}</span></p>
                </div>

                


                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div clclassNameass="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
            </>
    )
}

export default Location