import { Path, UseFormRegister } from "react-hook-form"

interface IFormRegister{
    name                    : string,
    email                   : string,
    password                : string,
    password_confirmation   : string
}

interface IFormLogin{
    email                   : string,
    password                : string,
}

interface propsLabelInput{
    name    : Path<IFormLogin | IFormRegister>,
    register: UseFormRegister<IFormLogin | IFormRegister>,
    type    : string,
    required: boolean
}

const LabelInput = ({name, type, register, required}: propsLabelInput) => {
    return(
        <>
            <label htmlFor={name} className="w-full mb-3">
                <p className="text-lg text-[#EEEEEE] font-bold">{name?.charAt(0).toUpperCase() + name?.substr(1)}</p>
                <input type={type} id={name} className="w-full h-10 rounded-xl ps-2 bg-transparent border border-gray-500 text-[#EEEEEE]" {...register(name)} required={required} />
                <span></span>
            </label>
        </>
    )
}

export default LabelInput