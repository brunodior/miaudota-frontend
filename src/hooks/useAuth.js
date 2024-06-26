import api from '../utils/api'

import useFlashMessage from './useFlashMessage'

import {useState, useEffect} from 'react'
import {useNavigate } from 'react-router-dom'
import useLoading from './useLoading'

export default function useAuth(){



    const [authenticated, setAuthenticated] = useState(false)
    const {setFlashMessage} = useFlashMessage()
    const {setLoading} = useLoading()
    const navigate  = useNavigate ()

    // verify has token to autecate
    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
        }, [])

    async function register(user){
        setLoading(true)
        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'success'

        try {
            const data = await api.post('/users/register', user).then((response) => {
                setLoading(false)

                return response.data
            })
            await authUser(data)
    
        }catch(error){
                setLoading(false)
               msgText = error.response.data.message
               msgType = 'error'

    }
    setFlashMessage(msgText, msgType)
    }


    async function login(user){
        setLoading(true)
        let msgText = 'Login realizado com sucesso'
        let msgType = 'success'

        try {
            const data = await api.post('/users/login', user).then((response) => {
                setLoading(false)
                return response.data
            })

            await authUser(data)
        }catch(error){
            setLoading(false)
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    
    async function authUser(data){

        setAuthenticated(true)

        localStorage.setItem('token', JSON.stringify(data.token))

        navigate('/')
    }


    function logout(){
        const msgText = 'Logout realizado com sucesso'
        const msgType = 'success'

        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        navigate('/')

        setFlashMessage(msgText, msgType)
    }


    return {authenticated, register, logout, login}

}