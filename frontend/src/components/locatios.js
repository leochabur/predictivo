const Location = (props) => {

    const { interno, distance } = props
    console.log(distance)
    return (        
            <>
                <div className="card">
                    <p>Interno: <span className="h5"></span></p>

                </div>
            </>
    )
}

export default Location