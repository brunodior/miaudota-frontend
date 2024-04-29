
function Select({text, name, options, handleOnChange, value}){
    return (
        <div className='d-flex flex-column'>
            <label className='text-primary h6 ' htmlFor={name}>{text}: </label>
            <select className='p-3 rounded-3 border border-primary h6' name={name} id={name} onChange={handleOnChange} value={value || ''}>
                <option>Selecione uma opção</option>
                {options.map((option) => (
                    <option value={option} key={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default Select