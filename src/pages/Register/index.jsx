import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import arrowImg from "../../assets/arrow.svg";
import { auth } from "../../services/firebaseConfig";
import "./registro.css";

export function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // Adiciona estado para o nome de usuário
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  function handleSignUp(e) {
    e.preventDefault();

    // Verifica se o nome de usuário, e-mail e senha estão preenchidos
    if (!username || !email || !password) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential?.user;

        if (user) {
          // Usuário criado com sucesso
          alert('Usuário cadastrado com sucesso! Faça o login.');
          setEmail("");
          setUsername("");
          setPassword("");
          setErrorMessage("");
        } else {
          console.error("Erro no cadastro: Usuário não foi criado", userCredential);
          setErrorMessage("Erro ao criar usuário. Tente novamente.");
        }
      })
      .catch((error) => {
        console.error("Erro no cadastro:", error);
        if (error.code === "auth/email-already-in-use") {
          setErrorMessage("Este e-mail já está sendo usado por outra conta.");
        } else if (error.code === "auth/invalid-email") {
          setErrorMessage("E-mail inválido. Verifique o formato do e-mail.");
        } else if (error.code === "auth/weak-password") {
          setErrorMessage("A senha é muito fraca. Escolha uma senha mais forte.");
        } else {
          setErrorMessage(`Erro ao criar usuário. Detalhes: ${error.message}`);
        }
      });
  }

  return (
    <div className="container">
      <div className="subContainer">
        <div className="header">
          <h1>Cadastrar</h1>
        </div>

        <form>
          {/* Adiciona campo de nome de usuário */}
          <div className="inputContainer">
            <label htmlFor="username">Nome de Usuário</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="johndoe"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Adiciona campo de e-mail */}
          <div className="inputContainer">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="johndoe@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Adiciona campo de senha */}
          <div className="inputContainer inputContainer-bottom">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********************"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Exibe a mensagem de erro de forma estilizada */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <div className="rodape">
            <p className="p">Já possui conta?</p>
            <Link to="/">Acessar minha conta</Link>
          </div>

          <button type="button" onClick={handleSignUp} className="button">
            Cadastrar <img src={arrowImg} alt="->" />
          </button>
        </form>
      </div>
    </div>
  );
}
