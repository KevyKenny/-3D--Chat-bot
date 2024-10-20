"use client";
import React, { useState, useEffect } from "react";
import styles from "../../app/page.module.css"; // Adjust if necessary
import { useRouter } from "next/navigation";
import Image from "next/image";
import useStore from "@/stores/useStore";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const { loginWithEmail, authenticated, profile, getUser } = useStore(
    (state) => ({
      loginWithEmail: state.loginWithEmail,
      authenticated: state.authenticated,
      profile: state.profile,
      getUser: state.getUser,
    })
  );

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    if (authenticated && !profile) {
      router.push("/home");
    }
    if (profile) {
      router.push("/train-model");
    }
  }, [profile]);

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.log("Please enter your email and password");
      return;
    }

    const res = await loginWithEmail(email, password);
    if (res?.error) {
      console.log(res.error);
    } else {
      await getUser();
      if(profile.role === "Admin") router.push("/train-model");
      else router.push("/home");
    }m
  };

  return (
    <div
      style={{
        backgroundImage: `url(/assets/images/auth.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <div className={`container d-flex justify-content-center align-items-center ${styles.main}`}>
        <div className="card p-4" style={{ width: "90%" }}>
          <div className="main_logo_home2 text-center">
            <Image
              width={150}
              height={100}
              className="logo2 img-fluid mt10"
              src={"/assets/logos/logo.png"}
              alt="logo"
            />
          </div>
          <form onSubmit={handleLoginWithEmail}>
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Type your email"
                aria-label="Email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Type your password"
                aria-label="Password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <button
                className="btn btn-success btn-block form-control"
                type="submit"
              >
                Log In
              </button>
            </div>
            <div className="form-group mb-2">
              <button
                className="btn btn-outline-success btn-block form-control"
                type="button"
                onClick={() => router.push("/home")}
              >
                Regular User! Go to assistant
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
