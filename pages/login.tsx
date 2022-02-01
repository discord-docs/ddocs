import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next/types";
import { FunctionComponent, useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import jwt from "jsonwebtoken";

interface LoginProps {
  code?: string;
}

const Login: FunctionComponent<LoginProps> = ({ code }) => {
  const [hasFailed, setHasFailed] = useState(false);
  const [cat, setCat] = useState<string>("");

  const auth = useAuth();
  const router = useRouter();

  const login = async () => {
    const token = await auth.Api?.login(code!);

    if (!token) {
      const result = await fetch("https://aws.random.cat/meow");

      setCat((await result.json()).file);

      setHasFailed(true);

      return;
    }

    const claims = jwt.decode(token) as {
      uid: string;
    };

    auth.setUser(claims.uid, token);

    router.push("/");
  };

  useEffect(() => {
    if (!code) {
      router.replace("/");
      return;
    }

    login();
  }, []);

  return (
    <>
      {hasFailed ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <h1>Shit broeke lmao</h1>
          <img
            style={{
              maxWidth: "100%",
              maxHeight: "60vh",
            }}
            src={cat}
          />
        </div>
      ) : undefined}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<LoginProps> = async (
  context
) => {
  return {
    props: {
      code: context.query.code as string,
    },
  };
};

export default Login;
