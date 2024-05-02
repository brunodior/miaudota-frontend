import { useEffect, useState } from 'react'
import api from '../../utils/api'
import styles from './PetDetails.module.css'
import { Link, useParams } from 'react-router-dom'

// hooks
import useFlashMessage from '../../hooks/useFlashMessage'


function PetDetails(){

    const [pet, setPet] = useState({})
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get(`/pets/${id}`).then((response) => {
            setPet(response.data.pet)
        })
    }, [id])


    async function schedule(){
        let msgType = 'success'

        const data = await api.patch(`pets/schedule/${pet._id}`,  {
            Authorization: `Bearer ${JSON.parse(token)}`
        }).then((response) => {
            return response.data
        }
        ).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }

    return (
        <>
           {pet.name &&
                <section className='p-4 p-md-5 d-flex flex-column align-items-center' style={{minHeight: '70vh'}}>
                    <div className='text-center'>
                        <h1 className='text-primary m-0'>Conhecendo {pet.name}</h1>
                        <p className='text-light h6 fw-normal'>Se tiver interesse, marque uma visita para conhecê-lo</p>
                    </div>
                    <div className='mt-3'>
                        {pet.images.map((image, index) => (
                            <img 
                                className={styles.img_pet}
                                src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                                alt={pet.name}
                                key={index}
                            />
                        ))}
                      
                    </div>

                    <div className="my-4">
                                                
                            <div className="d-flex justify-content-between">
                                <h4 className="fw-bold text-primary m-0">
                                    <span className="fw-normal">Idade:</span> {pet.age} anos
                                </h4>

                                <h4 className="fw-bold text-primary m-0 ms-3">
                                    <span className="fw-normal">Peso:</span> {pet.weight}kg
                                </h4>


                            </div>
                    </div>

                    {token ? (
                        <button onClick={schedule} className='btn btn-secondary px-4 py-2 rounded-4'>Solicitar uma visita</button>
                    ) : (
                        <p className='text-primary text-center'>Você precisa  <Link className='text-secondary fw-bold' to='/register' >criar uma conta</Link> para solicitar a visita </p>
                    )

                    }
                    
                </section>
            
            }

        </>
    )
}

export default PetDetails