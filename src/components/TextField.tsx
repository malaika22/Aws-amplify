import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
interface ITextField
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  title: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  toggleVisibility?: boolean;
}

const TextField = ({
  title,
  type,
  onChange,
  placeholder,
  toggleVisibility,
  ...props
}: ITextField) => {
  const [visibility, setVisibility] = useState(false);
  return (
    <div className='min-h-[80px]'>
      <div className='w-full relative'>
        <label className='absolute top-[-10px] px-[5px] left-[20px] text-[#8B8B8B] bg-white z-10 text-sm'>
          {title}
          <span className='text-[#F6000F]'>*</span>
        </label>

        <input
          placeholder={placeholder}
          onChange={onChange}
          {...props}
          type={type === "password" && visibility ? "password" : "text"}
          className={`${
            toggleVisibility && "pr-10"
          } bg-white relative p-3 w-full transition-all ease-in-out duration-[.15s] border-[#B5B5B5] border-2 rounded-md focus-visible:outline-none focus:border-[#80bdff] focus:shadow-[0px_0px_0px_0.2rem_rgb(0,123,255,0.25)]`}
        />

        {type === "password" && toggleVisibility && (
          <div className='absolute top-0 right-0'>
            <button
              type='button'
              tabIndex={-1}
              className='text-lg m-2 p-2 bg-transparent text-slate-400 hover:shadow-none hover:bg-slate-100 rounded-full transition-all duration-300 ease-in-out'
              onClick={() => setVisibility(!visibility)}
            >
              {visibility ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextField;
