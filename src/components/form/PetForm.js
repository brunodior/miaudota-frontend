import { useState } from "react"

import formStyles from './Form.module.css'
import Input from "./Input"
import Select from "./Select"




function PetForm({handleSubmit, petData, btnText}){

    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"]

    function onFileChange(e){
        setPreview(Array.from(e.target.files))
        setPet({...pet, images: [...e.target.files]})
    }

    function handleChange(e){
        setPet({...pet, [e.target.name]: e.target.value})

    }

    function handleColor(e){
        setPet({...pet, color: e.target.options[e.target.selectedIndex].text})
    }

    function submit(e){
        e.preventDefault()
        handleSubmit(pet)
    }

    return(
       <form onSubmit={submit} className="row w-100">
            
            <div className="mb-3 d-flex justify-content-center" >
                {preview.length > 0 
                ? preview.map((image, index) =>  
                    <img className={formStyles.img_pet} src={URL.createObjectURL(image)} alt={pet.name} key={`${pet.name}+${index}`} />
                ) 
                : pet.images && pet.images.map((image, index) => 
                <img className={formStyles.img_pet} src={`${process.env.REACT_APP_API}/images/pets/${image}`} alt={pet.name} key={`${pet.name}+${index}`} />

                )}
            </div>
            

            <Input
                text="Imagens do Pet"
                type="file"
                name="images"
                handleOnChange={onFileChange} 
                multiple={true}   
            /> 

            <Input
                text="Nome do Pet"
                type="text"
                name="name"
                placeholder="Digite o nome"
                handleOnChange={handleChange}
                value={pet.name || ''}    
            />      
            <div className="col-6">
                <Input
                    text="Idade do Pet"
                    type="text"
                    name="age"
                    placeholder="Digite a idade"
                    handleOnChange={handleChange}
                    value={pet.age || ''}    
                />  
            </div>

            <div className="col-6">
            <Input
                text="Peso do Pet"
                type="number"
                name="weight"
                placeholder="Digite o peso"
                handleOnChange={handleChange}
                value={pet.weight || ''}    
            />  
            </div>
               

                

            <Select 
                name="color"
                text="Selecione a cor"
                options={colors}
                handleOnChange={handleColor}
                value={pet.color || ''}
            />
            <div className="col-12">
                <input className="btn btn-primary py-3 rounded-4 w-100 mt-2" type="submit" value={btnText} />
            </div>

       </form>
    )
}

export default PetForm