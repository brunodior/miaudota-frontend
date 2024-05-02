import { useEffect, useState } from "react"
import api from "../utils/api"
import { Link } from "react-router-dom"

import styles from './Home.module.css'


function Home(){

    const [pets, setPets] = useState([])

    useEffect(() => {
        
        api.get('/pets').then((response) => {
            setPets(response.data.pets)
            
        }).catch((error) => {
            console.log(error)
        })

    }, [])

    return(
        <section className="p-4 p-md-5">
            <div className="mb-5">
                <h1 className="m-0 text-primary fw-bold">Adote um pet</h1>
                <p className="text-light">Veja os detalhes de cada um e conheça o tutor deles.</p>
            </div>
            <div className='row g-4'>
                {pets.length > 0 && (
                    pets.map((pet) => (
                        <div className="col-6 col-md-3 align-self-stretch">
                            <div className="border border-2 rounded-4  overflow-hidden h-100">
                                    <div style={{backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`}} className={styles.pet_card_image}> </div>

                                    <div className="p-3">
                                        <h4 className="m-0 text-primary fw-bold">{pet.name}</h4>
                                        <div className="d-flex justify-content-between mb-3">
                                            <p className="fw-bold mb-3 text-primary">
                                                <span className="fw-normal">Idade:</span> {pet.age} anos
                                            </p>

                                            <p className="fw-bold mb-3 text-primary">
                                                <span className="fw-normal">Peso:</span> {pet.weight}kg
                                            </p>


                                        </div>
                                       

                                        {pet.avaliable ? 
                                            (<Link className="btn btn-primary text-white rounded-4 w-100 h6 py-2 m-0" to={`pet/${pet._id}`}>Mais detalhes</Link> ) 
                                            
                                            : <p className='w-100 border border-secondary text-center text-secondary rounded-4 py-2 m-0 h6' >Adotado</p> }
                                    </div>

                                   

                            </div>
                        </div>
                    ))
                   
                )}
                {pets.length === 0 && (
                    <p>Não há pets cadastrados ou disponíbeis para adoção no momento</p>
                )}

            </div>
        </section>
    )
}

export default Home