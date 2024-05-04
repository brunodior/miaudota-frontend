import { useState, useEffect } from "react";
import bus  from '../../utils/bus'
import styles from './Message.module.css'

function Loading(){
    const [visibility, setVisibility] = useState(false)


    useEffect(()=> {
        bus.addListener('loading', ({visibility}) =>{
            setVisibility(visibility)
        })
    }, [])

    return (

        visibility && (
                <div style={{zIndex: '1000', width: '100vw', height: '100vh'}} className='bg-white bg-opacity-50 position-absolute'>
                    <div className="d-flex align-items-center flex-column justify-content-center h-100 w-100">
                        <div className="d-flex">
                            <div class="spinner-grow text-primary" role="status">
                                <span class="visually-hidden"></span>
                            </div>
                            <div class="spinner-grow text-primary mx-1" role="status">
                                <span class="visually-hidden"></span>
                            </div>
                            <div class="spinner-grow text-primary" role="status">
                                <span class="visually-hidden"></span>
                            </div>
                        </div>

                        <h5 className="text-primary mt-2">Aguarde...</h5>

                    </div>
                   
                </div>
        )
    )
}

export default Loading