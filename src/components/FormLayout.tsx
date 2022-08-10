import React from "react";

interface IFormLayout {
  children: React.ReactNode;
}
const FormLayout = ({ children }: IFormLayout) => {
  return (
    <div className='ring-1 ring-offset-0 ring-slate-50 max-w-full w-[600px] m-auto bg-white p-11 rounded-lg '>
      {children}
    </div>
  );
};

export default FormLayout;
