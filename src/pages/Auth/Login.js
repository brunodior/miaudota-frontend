import { useState, useContext } from "react"
import Input from '../../components/form/Input'

import styles from '../../components/form/Form.module.css'

// context
import { Context } from "../../context/UserContext"
import { Link } from "react-router-dom"

function Login(){

    const [user, setUser] = useState({})
    const {login} = useContext(Context)

    function handleOnChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    
    function handleSubmit(e){
        e.preventDefault()
        login(user)
    }

    return(
        
        <section className="w-100 overflow-hidden">
            <div className=" top-50 start-50 translate-middle position-absolute p-4 p-md-5 bg-white rounded-5" style={{minWidth: '50%'}}>
                    <h1 className="text-secondary fw-bold">Login</h1>

                    <form  onSubmit={handleSubmit}>
                        <Input 
                            text="E-mail"
                            type="email"
                            name="email"
                            placeholder="Digite o seu e-mail"
                            handleOnChange={handleOnChange}
                        />

                        <Input 
                            text="Senha"
                            type="password"
                            name="password"
                            placeholder="Digite a sua senha"
                            handleOnChange={handleOnChange}
                        />
                        <input className="btn btn-primary w-100 rounded-5 p-2" type="submit" value="Entrar"/>
                    </form>
                    <p className="mt-3 fw-normal text-primary">
                        Não tem conta? <Link to="/register" className=" text-decoration-none fw-bold text-secondary">Clique aqui.</Link>
                    </p>
            </div>
            

            <img className="" style={{width: '100%', height: '90vh', objectFit: 'cover' }} src={`${process.env.REACT_APP_API}/images/general/fundoMiau.png`}/> 

                

        </section>
    )
}

export default Login