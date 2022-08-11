import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ChangeEventHandler, useState } from "react";
import Auth, { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import FormLayout from "../components/FormLayout";
import { FcGoogle } from "react-icons/fc";
import TextField from "../components/TextField";

const Home: NextPage = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <FormLayout>
        <h1 className='text-center text-2xl font-bold'>Login Form</h1>
        <div>
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
        </div>
        <div>
          <button
            onClick={() =>
              Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Facebook,
              })
            }
          >
            Open Facebook
          </button>
          <button
            onClick={() =>
              Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Google,
              })
            }
          >
            Open Google
          </button>
        </div>
      </FormLayout>
    </div>
  );
};

export default Home;
