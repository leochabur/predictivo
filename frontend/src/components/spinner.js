

const Spinner = ({ mensaje = '' }) => {

    return (
        
            <>
              <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
              <br/>
              <div className="text-center text-danger">
              <h5> { mensaje } </h5>
              </div>
            </>
    )
}

export default Spinner