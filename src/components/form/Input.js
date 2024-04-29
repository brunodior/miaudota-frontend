
function Input({type, text, name, placeholder, handleOnChange, value, multiple}){
    return (
        <div className='d-flex flex-column mb-2'>
            <label className='text-primary h6 ' htmlFor={name}>{text}:</label>
            <input 
                className='p-3 rounded-3 border border-primary h6'
                type={type} 
                name={name} 
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value} 
                {...(multiple ? {multiple} : '' )}    />
        </div>
    )
}

export default Input