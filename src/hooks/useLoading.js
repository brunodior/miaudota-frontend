import bus from '../utils/bus'

export default function useLoading(){
    function setLoading(visibility){
        console.log(visibility)
        bus.emit('loading', {
            visibility: visibility,
        })
    }
    return { setLoading }
}

