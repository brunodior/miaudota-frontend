import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../utils/api'
import styles from './AddPet.module.css'

// hooks
import useFlashMessage from '../../hooks/useFlashMessage'
import PetForm from '../../components/form/PetForm'


function AddPet(){

    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()

    async function registerPet(pet){
        let msgType ='success'

        const formData = new FormData
        
        await Object.keys(pet).forEach((key) => {
            if(key === 'images'){
                for(let i=0; i< pet[key].length; i++){
                    formData.append('images', pet[key][i])
                }
            }else {
                formData.append(key, pet[key])
            }
        })

        const data = await api.post('/pets/create', formData, {
            Authorization: `Bearer ${JSON.parse(token)}`,
            'Content-type': 'multipart/form-data'
        }).then((response) => {
            return response.data
        })
        .catch((err)=> {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)

        if(msgType !== 'error'){
        navigate('/pet/mypets')
    
        }

    }

    return(
        <section className='p-5'>
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