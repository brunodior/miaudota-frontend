function Input({ type, text, name, placeholder, handleOnChange, value, multiple }) {
    if (type !== "file") {
        return (
            <>
                <div className='d-flex flex-column mb-2'>
                    <label className='text-primary h6' htmlFor={name}>{text}:</label>
                    <input
                        className='p-3 rounded-3 border border-primary h6'
                        type={type}
                        name={name}
                        id={name}
                        placeholder={placeholder}
                        onChange={handleOnChange}
                        value={value}
                        {...(multiple ? { multiple } : '')} />
                </div>
            </>
        );
    } else {
        const handleClick = () => {
            document.getElementById('images').click();
          };
        return (
            <>
            

            <div className='d-flex flex-column mb-2'>
                <div onClick={handleClick} className="rounded-4 p-2 d-flex justify-content-center align-items-center" style={{ border: '2px dashed #a1a2d6'}}>
                    <i className="material-icons d-flex text-secondary">photo_camera</i>
                    <h6 className="m-0 text-secondary ms-2">Adicione uma foto</h6>
                </div>
                <input  
                        
                        className='p-3 rounded-3 border border-primary h6'
                        type={type}
                        name={name}
                        id='images'
                        placeholder={placeholder}
                        onChange={handleOnChange}
                        value={value}
                        style={{ display: 'none' }}
                        {...(multiple ? { multiple } : '')} />
               
            </div>
        </>
        );
    }
}

export default Input;
