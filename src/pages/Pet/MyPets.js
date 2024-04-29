import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import RoundedImage from "../../components/layout/RoundedImage"
import useFlashMessage from "../../hooks/useFlashMessage"
import api from "../../utils/api"

import styles from './Dashboard.module.css'


function MyPets(){
    const [pets, setPets] = useState([])

    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {
        api.get('/pets/mypets', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setPets(response.data.pets)
        })
    }, [token])

    async function removePet(id){
        let msgType = 'success'

        const data = await api.delete(`/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            const updatedPets = pets.filter((pet) => pet._id !== id)
            setPets(updatedPets)
            return response.data
        }
        ).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }

    async function concludeAdoption(id){
        let msgType = 'success'

        const data = await api.patch(`/pets/conclude/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType ='error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }

    return(
        <section className="p-5" >
            <div className="mb-5 d-flex justify-content-between align-items-center">
                <h1 className="m-0 text-primary fw-bold">Meus pets</h1>
                <Link className="btn btn-primary px-5 rounded-4" to="/pet/add">Cadastrar Pet</Link>

            </div>

            
            <div className="row">
                {pets.length > 0 && 
                    pets.map((pet) => (
                        <div className="col-12" key={pet._id}>

                                <div className="border border-2 rounded-4 p-3 d-flex justify-content-between align-items-center mb-2">

                                        <div className="d-flex align-items-center">
                                                <RoundedImage
                                                    src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                                                    alt={pet.name}
                                                    width="px75"
                                                />
                                            <div className="ms-3">
                                                <h4 className="m-0 text-primary fw-bold">{pet.name}</h4>
                                                <div className="d-flex justify-content-between">
                                                    <p className="fw-bold text-primary m-0">
                                                        <span className="fw-normal">Idade:</span> {pet.age} anos
                                                    </p>

                                                    <p className="fw-bold text-primary m-0 ms-3">
                                                        <span className="fw-normal">Peso:</span> {pet.weight}kg
                                                    </p>


                                                </div>
                                            </div>
                                        

                                        </div>

                                        
                                        <div>
                                            {pet.avaliable 
                                                ? (<> 
                                                    {pet.adopter && 
                                                        ( <button className="btn btn-success h6 rounded-4 m-0 px-4 me-2 py-2 text-white" onClick={() => {concludeAdoption(pet._id)}} >Concluir adoção</button>)}
                                                        <Link className="p-1 btn btn-outline-primary rounded-4 me-2" to={`/pet/edit/${pet._id}`}>
                                                            <i class="material-icons d-flex">edit</i>
                                                        </Link>
                                                        <button className="p-1 btn btn-outline-danger rounded-4" onClick={() => { removePet(pet._id)}}>
                                                                <i class="material-icons d-flex">delete</i>
                                                        </button>
                                                        </>  )
                                                : <p className="border border-2 border-secondary px-4 py-1 rounded-4 m-0 text-secondary" >Pet já adotado</p> }
                                        </div>  

                                </div>

                               

                                

                        </div>
                        
                        
                    ))
                }
                {pets.length === 0 && 

                    (
                            <div className='w-100 h-100 bg-light bg-opacity-25 p-4 rounded-4 d-flex flex-column align-items-center'>
                                <i class="material-icons-outlined d-flex text-light" style={{fontSize: '100px'}}>
                                    sentiment_dissatisfied
                                </i>
                                <h5 className='text-light m-0 mt-2 fw-normal'>Não há pets cadastrados</h5>
                                
                            </div>

                    )

                }
            </div>
        </section>
    )
}

export default MyPets