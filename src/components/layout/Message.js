import { useState, useEffect } from "react";
import bus  from '../../utils/bus'
import styles from './Message.module.css'

function Message(){
    const [visibility, setVisibility] = useState(false)
    const [type, setType] = useState('')
    const [message, setMessage] = useState('')

    useEffect(()=> {

        bus.addListener('flash', ({message, type}) =>{
            setVisibility(true)
            setMessage(message)
            setType(type)

            setTimeout(() =>{
                setVisibility(false)
            }, 3000)
        })

    }, [])

    return (
        visibility && (
                <div style={{zIndex: '1000'}} className={`rounded-4 position-absolute w-100 start-50 translate-middle ${styles.message} ${styles[type]}`}>
                    {message}
                </div>
        )
    )
}

export default Message