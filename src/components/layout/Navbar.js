import { Link } from "react-router-dom"

import styles from './Navbar.module.css'
import { NavLink } from "react-router-dom";

// context
import { Context } from "../../context/UserContext"
import { useContext, useEffect, useState } from "react"
import api from "../../utils/api";
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import logo from '../../assets/img/logoMiuadota.png'

function Navbar(){

    const [user, setUser] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')

    

    useEffect(() => {
        { token && 
            api.get('/users/checkuser', {
                headers: {
                    Authorization: `Baerer ${JSON.parse(token)}`,
                }
            }).then((response) => {
                setUser(response.data)
                return
            }).catch((err) => {
                return err
            })
        }
        
    }, [token])

    const {authenticated, logout} = useContext(Context)

    return(
       <nav className='bg-primary d-flex justify-content-between align-items-center px-4 px-md-5 py-3'>
            <div >
                <img style={{height: '20px'}} src={logo} alt="Minha Imagem" />
            </div>
                    
          
            <IonMenu contentId="main-content">
                
                <IonContent className="ion-padding">

                <ul className="nav nav-underline d-block">
                            
                            {authenticated && 
                                
                                
                                <li className="nav-item px-1 my-3">
                                    <Link to='/user/profile' className="btn btn-secondary d-flex rounded-5 align-items-center"> 
                                        
                                        <img className={styles.img_user} src={`${process.env.REACT_APP_API}/images/users/${user.image}`}/>  
                                        <h5 className="m-0 ms-2">{user.name}</h5>
                                    </Link>
                                </li>

                            }

                            <li className="nav-item px-1 mt-1"><NavLink className='nav-link h6' to="/">Adotar</NavLink></li>

                            {authenticated ? 
                            (
                            <>   
                                    <li className="nav-item px-1 mt-1"><NavLink className='nav-link h6' to="/pet/myadoptions">Minhas adoções</NavLink></li>
                                    <li className="nav-item px-1 mt-1"><NavLink className='nav-link h6' to="/pet/mypets">Meus pets</NavLink></li>
                                    <li className="nav-item nav-link cursor-pointer px-1 h6 mt-1 d-flex align-items-center" onClick={logout}> <i className="material-icons d-flex fs-5 me-2">logout</i> Sair</li>
                            </> 

                            ) : 

                            (
                                <>
                                    <li className="nav-item px-1 mt-1 text-primary"><NavLink className='nav-link h6' to="/login">Entrar</NavLink></li>
                                    <li className="nav-item px-1 mt-1"><NavLink className='nav-link h6' to="/register">Cadastrar</NavLink></li>
                                </>
                            )

                                
                            }


                </ul>

                
                </IonContent>
            </IonMenu>
            <div id="main-content" color="white" className="d-flex d-md-none text-white">
                <IonMenuButton></IonMenuButton>
            </div>
  
        

            <ul className="nav nav-underline d-none d-md-flex">

                <li className="nav-item px-1 mt-1"><NavLink className='nav-link h6' to="/">Adotar</NavLink></li>

                {authenticated ? 
                (
                   <>   
                        <li className="nav-item px-1 mt-1"><NavLink className='nav-link h6' to="/pet/myadoptions">Minhas adoções</NavLink></li>
                        <li className="nav-item px-1 mt-1"><NavLink className='nav-link h6' to="/pet/mypets">Meus pets</NavLink></li>
                        <li className="nav-item nav-link cursor-pointer px-1 h6 mt-1 d-flex align-items-center" onClick={logout}> <i className="material-icons d-flex fs-5 me-2">logout</i> Sair</li>
                        <li className="nav-item px-1"><Link to='/user/profile'> <img className={styles.img_user} src={`${process.env.REACT_APP_API}/images/users/${user.image}`}/>  </Link></li>
                   </> 
                
                ) : 
                
                (
                    <>
                        <li className="nav-item px-1 mt-1"><NavLink className='nav-link h6' to="/login">Entrar</NavLink></li>
                        <li className="nav-item px-1 mt-1"><NavLink className='nav-link h6' to="/register">Cadastrar</NavLink></li>
                    </>
                )

                    
                }

                
            </ul>
       </nav>
    )
}

export default Navbar