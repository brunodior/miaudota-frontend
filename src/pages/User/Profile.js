
import api from '../../utils/api'

import Input from '../../components/form/Input'
import { useEffect, useState } from 'react'
import useFlashMessage from '../../hooks/useFlashMessage'
import RoundedImage from '../../components/layout/RoundedImage'
import useLoading from '../../hooks/useLoading'
import Loading from '../../components/layout/Loading'


function Profile(){

    const [user, setUser] = useState({})
    const [preview, setPreview] = useState()
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const {setLoading} = useLoading()

    useEffect(() => {
        api.get('/users/checkuser', {
            headers: {
                Authorization: `Baerer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data)
        })
    }, [token])

    function onFileChange(e){
        setPreview(e.target.files[0])
        setUser({...user, [e.target.name]: e.target.files[0]})

    }

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }


    async function handleSubmit(e){

        setLoading(true)
        e.preventDefault()

        let msgType = 'success'
        const formData = new FormData()

        await Object.keys(user).forEach((key) => 
        formData.append(key, user[key])
    )

    const data = await api.patch(`/users/edit/${user._id}`, formData, {
        headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => {
        setLoading(false)
        return response.data


    }).catch((err) => {
        setLoading(false)
        msgType = 'error'
        return err.response.data
    })

        setFlashMessage(data.message, msgType)
    }

    return(
        <section className='p-4 p-md-5'>                
            <form onSubmit={handleSubmit} className='row'>
                    <div className='col-md-2'>
                        <div className='d-flex justify-content-center mb-2' >
                           
                               
                                {!user.image && !preview ? 
                                    (
                                        <RoundedImage 
                                        src={`https://jeffjbutler.com//wp-content/uploads/2018/01/default-user.png`
                                        }
                                        alt={user.name} />
                                    )
                                    : (
                                        <RoundedImage 
                                        src={preview ? URL.createObjectURL(preview) : `${user.image}`
                                        }
                                        alt={user.name} />
                                    )
                                
                                }
                            
                               
                              
                           
                        </div>
                        
                        <Input
                            text='Imagem'    
                            type='file'
                            name='image'
                            handleOnChange={onFileChange}
                        />
                    </div>
                   <div className='col-md-10'>
                   <div className='row'>
                            <div className='col-12'>
                                <Input
                                    text='Nome'    
                                    type='text'
                                    name='name'
                                    placeholder='Digite seu nome'
                                    handleOnChange={handleChange}
                                    value={user.name || ''}
                                />
                            </div>
                            
                            <div className='col-12 col-md-8'>
                                <Input
                                    text='E-mail'    
                                    type='email'
                                    name='email'
                                    placeholder='Digite seu e-mail'
                                    handleOnChange={handleChange}
                                    value={user.email || ''}
                                />
                            </div>

                            <div className='col-12 col-md-4'>
                                    <Input
                                        text='Telefone'    
                                        type='text'
                                        name='phone'
                                        placeholder='Digite seu telefone'
                                        handleOnChange={handleChange}
                                        value={user.phone || ''}
                                    />
                            </div>
                        
                            <div className='col-6'>
                                <Input
                                    text='Senha'    
                                    type='password'
                                    name='password'
                                    placeholder='Digite a sua senha'
                                    handleOnChange={handleChange}
                                />
                            </div>
                            <div className='col-6'>
                                <Input
                                    text='Confirme a senha'    
                                    type='password'
                                    name='confirmpassword'
                                    placeholder='Confirme a sua senha'
                                    handleOnChange={handleChange}
                                />
                            </div>

                            <div className='col-12'>
                                <input className='btn btn-primary rounded-4 py-3 w-100' type='submit' value='Salvar'/>
                            </div>
                   </div>
                   </div>
                   

                   
                    

            </form>
                   
        </section>
    )
}

export default Profile