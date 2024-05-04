import { useEffect, useState } from "react"
import api from "../../utils/api"

import styles from './AddPet.module.css'
import PetForm from "../../components/form/PetForm"

// hooks
import useFlashMessage from "../../hooks/useFlashMessage"
import { useNavigate, useParams } from "react-router-dom"
import useLoading from "../../hooks/useLoading"



function EditPet(){

    const [pet, setPet] = useState({})
    const [token] = useState(localStorage.getItem('token') ||  '')
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()
    const {setLoading} = useLoading()
    const navigate = useNavigate()
    useEffect(() => {
        api.get(`/pets/${id}`, {
           Authorization: `Bearer ${JSON.parse(token)}` 
        }).then((response) => {
            setPet(response.data.pet)
           
        }, [token, id])
    })

    async function updatePet(pet){

        setLoading(true)
        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(pet).forEach((key) => {
                formData.append(key, pet[key])
        })

        const data = await api.patch(`pets/${pet._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            setLoading(false)
            navigate('/pet/mypets')
            return response.data
        }).catch((err) => {
            setLoading(false)
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }

    return(
        <section className="p-4 p-md-5">
            <div className='d-flex flex-column align-items-center'>
                    <div className="mb-3 text-center">
                            <h1 className="m-0 text-primary fw-bold">Editando {pet.name}</h1>
                            <p className="text-light m-0">Depois da edição os dados serão autualizados</p>
                    </div>

                    {pet.name && (
                        
                        <PetForm handleSubmit={updatePet} btnText="Atualizar" petData={pet}/>
                    )}

            </div>

            
        </section>
    )
}

export default EditPet