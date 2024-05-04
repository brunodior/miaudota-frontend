import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../utils/api'
import styles from './AddPet.module.css'

// hooks
import useFlashMessage from '../../hooks/useFlashMessage'
import PetForm from '../../components/form/PetForm'
import useLoading from '../../hooks/useLoading'


function AddPet(){

    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const {setLoading} = useLoading()
    const navigate = useNavigate()

    async function registerPet(pet){
        let msgType ='success'
        setLoading(true)
        const formData = new FormData
        
        await Object.keys(pet).forEach((key) => {
                formData.append(key, pet[key])
            
        })

        const data = await api.post('/pets/create', formData, {
            Authorization: `Bearer ${JSON.parse(token)}`,
            'Content-type': 'multipart/form-data'
        }).then((response) => {
            setLoading(false)
            return response.data
        })
        .catch((err)=> {
            setLoading(false)
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)

        if(msgType !== 'error'){
        navigate('/pet/mypets')
    
        }

    }

    return(
        <section className='p-4 p-md-5'>
            <div className='d-flex flex-column align-items-center'>
                <div className="mb-3 text-center">
                    <h1 className="m-0 text-primary fw-bold">Cadastre um pet</h1>
                    <p className="text-light m-0">Depois ele ficará disponivel para adoção</p>
                </div>
               <PetForm handleSubmit={registerPet} btnText="Cadastrar Pet"/>
            </div>
        </section>
    )
}

export default AddPet