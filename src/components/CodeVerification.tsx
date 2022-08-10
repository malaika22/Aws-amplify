import { Auth } from "aws-amplify";
import { useState } from "react";
import TextField from "./TextField";

const CodeVerfication = ({
  verificationState,
}: {
  verificationState: { email: string; password: string };
}) => {
  const [code, setCode] = useState("");

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(verificationState.email, code);
      await Auth.signIn(verificationState.email, verificationState.password);
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  }
  return (
    <>
      <h1 className='text-center text-2xl font-bold mb-4'>Code Verification</h1>
      <div>
        <TextField
          title='Code Verification'
          type='text'
          name='codeVerification'
          placeholder='Enter email'
          onChange={(e) => {
            setCode(e.target.value);
          }}
        />

        <div className='text-center'>
          <button
            className='w-36 h-10 bg-pink-500 text-white rounded-lg'
            onClick={confirmSignUp}
          >
            Confirm code
          </button>
        </div>
      </div>
    </>
  );
};

export default CodeVerfication;
