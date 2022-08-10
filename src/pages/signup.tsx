import { Auth } from "aws-amplify";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import CodeVerfication from "../components/CodeVerification";
import FormLayout from "../components/FormLayout";
import TextField from "../components/TextField";

const SignupPage: NextPage = () => {
  const [verificationState, setVerificationState] = useState<{
    email: string;
    password: string;
  } | null>(null);
  console.log(setVerificationState);
  return (
    <div>
      <FormLayout>
        {verificationState ? (
          <CodeVerfication verificationState={verificationState} />
        ) : (
          <SignupForm
            handleVerificationState={(val) => setVerificationState(val)}
          />
        )}
      </FormLayout>
    </div>
  );
};

export default SignupPage;

const SignupForm = ({
  handleVerificationState,
}: {
  handleVerificationState: (val: { email: string; password: string }) => void;
}) => {
  const router = useRouter();

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("in form state");
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    console.log(formState);
    try {
      const user = await Auth.signUp({
        username: formState.email,
        password: formState.password,
        attributes: {
          "custom:first_name": formState.firstName,
          "custom:last_name": formState.lastName,
        },
      });
      console.log(user);
      handleVerificationState({
        email: formState.email,
        password: formState.password,
      });
    } catch (Err) {
      console.log("signup error", Err);
    }
  };
  return (
    <>
      <h1 className='text-center text-2xl font-bold mb-4'>Login Form</h1>
      <div>
        <TextField
          title='First name'
          type='text'
          name='firstName'
          placeholder='Enter first name'
          onChange={formChange}
        />
        <TextField
          title='Last name'
          type='text'
          name='lastName'
          placeholder='Enter last name'
          onChange={formChange}
        />
        <TextField
          title='Email'
          type='email'
          name='email'
          placeholder='Enter email'
          onChange={formChange}
        />
        <TextField
          title='Password'
          type='password'
          name='password'
          placeholder='Enter password'
          onChange={formChange}
          toggleVisibility
        />
        <div className='text-center'>
          <button
            className='w-36 h-10 bg-pink-500 text-white rounded-lg'
            onClick={() => handleSignup()}
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};
