import { useEffect, useState } from 'react'
import api from '../../utils/api'
import styles from './Dashboard.module.css'
import RoundedImage from '../../components/layout/RoundedImage'



function MyAdoptions(){

    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {

        api.get('/pets/myadoptions', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setPets(response.data.pets)
        })

    }, [token])

    return (
        <section className='p-5'>

            <div className="mb-5">
                <h1 className="m-0 text-primary fw-bold">Minhas Adoções</h1>
            </div>
           

            <div >
                {pets.length > 0 && pets.map((pet) => (

                      <div className='border border-2 rounded-4 p-3 d-flex justify-content-between align-items-center mb-2'  key={pet._id}>
                       
                        <div className='d-flex align-items-center'>
                                <RoundedImage
                                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                                alt={pet.name}
                                width="px75"
                            />
                    
                            <div className="ms-3">
                                <h4 className="m-0 text-primary fw-bold">{pet.name}</h4>
                                <div className="d-flex justify-content-between">
                                    <p className="fw-bold text-primary m-0">
                                        <span className="fw-normal">Ligue para:</span> {pet.user.phone}
                                    </p>

                                    <p className="fw-bold text-primary m-0 ms-3">
                                        <span className="fw-normal">Fale com:</span> {pet.user.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                      


                      <div>
                          {pet.avaliable 
                              ? (<> 
                                 <p className='bg-warning py-2 px-4 rounded-4 text-white m-0' >Adoção em processo</p> 
                                </>  )
                              : <p className='bg-success py-2 px-4 rounded-4 text-white m-0'>Parabéns por concluir a adoção</p> }
                      </div>

              </div>
              

                ))}
                {pets.length === 0 && 
                (
                    <div className='w-100 h-100 bg-light bg-opacity-25 p-4 rounded-4 d-flex flex-column align-items-center'>
                        <i class="material-icons-outlined d-flex text-light" style={{fontSize: '100px'}}>
                            sentiment_dissatisfied
                        </i>
                        <h5 className='text-light m-0 mt-2 fw-normal'>Ainda não há adoções de Pets.</h5>
                        
                    </div>

                )
                }
            </div>
        </section>
    )
}

export default MyAdoptions