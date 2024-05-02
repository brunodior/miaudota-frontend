import { Link } from "react-router-dom"

import styles from './Navbar.module.css'
import { NavLink } from "react-router-dom";

// context
import { Context } from "../../context/UserContext"
import { useContext, useEffect, useState } from "react"
import api from "../../utils/api";
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';


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
                <img style={{height: '20px'}} src={`${process.env.REACT_APP_API}/images/users/logoMiuadota.png`} alt=""/>
            </div>
                    
          
            <IonMenu contentId="main-content">
                
                <IonContent className="ion-padding">

                <ul className="nav nav-underline d-block">

                            <li className="nav-item px-1 mt-1"><NavLink className='nav-link h6' to="/">Adotar</NavLink></li>

                            {authenticated ? 
                            (
                            <>   
                                    <li className="nav-item px-1 mt-1"><NavLink className='nav-link h6' to="/pet/myadoptions">Minhas adoções</NavLink></li>
                                    <li className="nav-item px-1 mt-1"><NavLink className='nav-link h6' to="/pet/mypets">Meus pets</NavLink></li>
                                    <li className="nav-item nav-link cursor-pointer px-1 h6 mt-1" onClick={logout}>Sair</li>
                                    <li className="nav-item px-1"><Link to='/user/profile'> <img className={styles.img_user} src={`${process.env.REACT_APP_API}/images/users/${user.image}`}/>  </Link></li>
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
                        <li className="nav-item nav-link cursor-pointer px-1 h6 mt-1" onClick={logout}>Sair</li>
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