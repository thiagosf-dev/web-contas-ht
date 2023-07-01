import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import axios, { AxiosError } from "axios";

interface IInfoResponse {
  nome: string;
  status: string;
}

interface IInforErrorResponse {
  mensagem: string;
  satatus: number;
  success: boolean;
}

interface IForm {
  email: string;
  senha: string;
}

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [form, setForm] = useState<IForm>({} as IForm);

  async function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    // setIsLoading(true);
    event.preventDefault();

    console.log("form :>> ", form);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 3000);

    try {
      // const response = await axios.get<IInfoResponse>(
      //   "http://localhost:3001/info"
      // );
      const response = await axios.post<IInfoResponse>(
        "http://localhost:3000/login",
        { ...form }
      );
      setHasError(false);
      console.log("response :>> ", response);
    } catch (error) {
      const err: AxiosError<IInforErrorResponse> =
        error as AxiosError<IInforErrorResponse>;
      setHasError(true);
      console.error("Ocorreu um erro :>> ", err.response?.data.mensagem);
    } finally {
      setIsLoading(false);
    }
  }

  // useEffect(() => {
  //   console.log("object1");
  // }, []);

  // useEffect(() => {
  //   console.log("object2");
  // }, [isLoading]);

  // useEffect(() => {
  //   console.log("object3");
  // });

  return isLoading ? (
    <div>
      <span style={{ color: "#fff" }}>Carregando...</span>
    </div>
  ) : (
    <div className={styles["login-container"]}>
      {hasError && (
        <span className={styles.error}>
          Ocorreu um erro... Tente novamente!
        </span>
      )}
      <h2>Login</h2>
      <form>
        <input
          type="text"
          placeholder="E-mail"
          value={form.email || ""}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
        />
        <input
          type="password"
          placeholder="Senha"
          value={form.senha || ""}
          onChange={(event) => setForm({ ...form, senha: event.target.value })}
        />
        <button type="submit" onClick={(event) => handleSubmit(event)}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
