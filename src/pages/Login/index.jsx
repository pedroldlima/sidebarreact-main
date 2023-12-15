import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import arrowImg from "../../assets/arrow.svg";
import { auth } from "../../services/firebaseConfig";
import "./login.css";
import { useContext } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInGoogle } = useContext(AuthGoogleContext);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();

  const emailValidator = (email) => {
    if (!email || !email.includes("@")) {
      showToast("E-mail inválido", "error");
      return "E-mail inválido";
    }
    return "";
  };

  const passwordValidator = (password) => {
    if (!password || password.length < 6) {
      showToast("Senha deve ter pelo menos 6 caracteres", "error");
      return "Senha deve ter pelo menos 6 caracteres";
    }
    return "";
  };

  const showToast = (message, type = "error") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const onLoginPressed = async () => {
    const emailError = emailValidator(email);
    const passwordError = passwordValidator(password);

    if (emailError || passwordError) {
      return;
    }

    try {
      await signInWithEmailAndPassword(email, password);
      showToast('Logado com sucesso usando e-mail e senha', 'success');
      navigate('/home');
    } catch (error) {
      showToast(`Erro ao fazer login usando e-mail e senha: ${error.message}`, 'error');
    }
  };

  const handleSignInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await signInGoogle();
      showToast('Logado com sucesso usando o Google', 'success');
      navigate('/home');
    } catch (error) {
      showToast(`Erro ao fazer login usando o Google: ${error.message}`, 'error');
    }
  };

  if (user) {
    console.log(user);
  }

  return (
    <div className="container">
      <header className="header">
        <span>Por favor, digite suas informações de login</span>
      </header>

      <form>
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

        <div className="inputContainer">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********************"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <a href="#">Esqueceu sua senha?</a>

        <button type="button" className="btn-login" onClick={onLoginPressed}>
          Entrar <img src={arrowImg} alt="->" />
        </button>
        <div className="footer">
          <p id="conta">Você não tem uma conta?</p>
          <Link to="/register">Crie a sua conta aqui</Link>
        </div>

        <button type="button" className="google" onClick={handleSignInWithGoogle}>
           Entrar com o Google
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}
