import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { Amplify, Auth, Hub } from "aws-amplify";
import awsconfig from "../aws-exports";
import { useEffect, useState } from "react";
Amplify.configure({ ...awsconfig, ssr: true });

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  useEffect(() => {
    Hub.listen("auth", ({ payload }) => {
      const { event } = payload;
      console.log("event", event);
      if (event === "autoSignIn" || event === "signIn") {
        const user = payload.data;
        setUser(user);
        console.log("auto signin", user);
        router.push("/success");
        // assign user
      } else if (event === "autoSignIn_failure") {
        setUser(null);
        router.push("/");
      } else if (event === "signOut") {
        setUser(null);
        router.push("/");
      }
    });

    return () => {
      Hub.remove("auth", () => {});
    };
  }, []);

  const signOut = async () => {
    try {
      await Auth.signOut();
    } catch (err) {
      console.log("signout error", err);
    }
  };

  return (
    <div className='bg-[#E5E5E5] h-screen'>
      <nav>
        <Link href={"/"}>
          <a>Login</a>
        </Link>
        <Link href={"/signup"}>
          <a>Sign up</a>
        </Link>
        {user && <div onClick={signOut}>Signout</div>}
      </nav>
      <div className='max-w-5xl mx-auto'>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
