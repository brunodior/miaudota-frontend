import Input from "../../components/form/Input"
import { Link } from "react-router-dom"
import styles from '../../components/form/Form.module.css'
import { useContext, useState } from "react"

// CONTEXT
import { Context } from "../../context/UserContext"

function Register(){

    const [user, setUser] = useState({})
    const {register} = useContext(Context)

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        register(user)
    }

    return(



<section className="w-100 h-100 overflow-hidden position-relative">
        <div className=" top-50 start-50 translate-middle position-absolute p-4 p-md-5 bg-white rounded-5" style={{minWidth: '90%'}}>
                <h1 className="text-secondary fw-bold">Cadastre-se</h1>

                <form className="row" onSubmit={handleSubmit}>

                        <div className="col-6">
                            <Input 
                                    text="Nome"
                                    type="text"
                                    name="name"
                                    placeholder="Digite o seu nome" 
                                    handleOnChange={handleChange} 
                                />
                        </div>
                        <div className="col-6">
                            <Input 
                                    
                                    text="Telefone"
                                    type="text"
                                    name="phone"
                                    placeholder="Digite o seu telefone" 
                                    handleOnChange={handleChange} 
                                /> 
                        </div>
                        <div className="col-12">
                        <Input 
                            text="E-mail"
                            type="email"
                            name="email"
                            placeholder="Digite o seu email" 
                            handleOnChange={handleChange} 
                        /> 
                
                        </div>
                            
                        <div className="col-6">
                        <Input 
                            text="Senha"
                            type="password"
                            name="password"
                            placeholder="Digite a sua senha" 
                            handleOnChange={handleChange} 
                        />   
                        </div>
                        
                        <div className="col-6">
                        <Input 
                            text="Confirme a senha"
                            type="password"
                            name="confirmpassword"
                            placeholder="Confirme a sua senha" 
                            handleOnChange={handleChange} 
                        />  
                        </div>

                        <div className="col-12">
                            <input className="btn btn-primary w-100 rounded-5 p-2" type="submit" value="Cadastrar"/>
                            <p className="m-0 mt-2 fw-normal text-primary">
                                Já tem conta? <Link to="/login" className=" text-decoration-none fw-bold text-secondary">Clique aqui.</Link>
                            </p>
                        </div>
                        

                        
                    
                    

                        
                        
                </form>
                
        </div>


        <img style={{width: '100%', height: '90vh', objectFit: 'cover'  }} src={`${process.env.REACT_APP_API}/images/general/fundoMiau.png`}/> 

    

</section>


    )
}

export default Register