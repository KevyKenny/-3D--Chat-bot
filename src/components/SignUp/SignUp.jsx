"use client";
import React, { useState, useEffect } from "react";
import styles from "../../app/page.module.css"; // Adjust if necessary
import { useRouter } from "next/navigation";
import Image from "next/image";
import useStore from "@/stores/useStore";

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const { signupWithEmail, authenticated, profile, getUser } = useStore((state) => ({
    signupWithEmail: state.signupWithEmail,
    authenticated: state.authenticated,
    profile: state.profile,
    getUser: state.getUser,
  }));

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

  const handleSignUpWithEmail = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.log("Please enter your email and password");
      return;
    }
    if(password !== confirmPassword){
        console.log("Your password and confirmPassword does not match");
        return;
    }
    const res = await signupWithEmail(email, password);
    console.log(res);
    if (res?.error) {
      console.log(res.error);
    } else {
      await getUser();
      router.push("/register-user-details");
    }
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
          <form>
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
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                aria-label="Password"
                value={confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <button
                className="btn btn-success btn-block form-control"
                type="submit"
                onClick={handleSignUpWithEmail}
              >
                Sign Up
              </button>
            </div>
            <div className="form-group mb-2">
              <button
                className="btn btn-outline-success btn-block form-control"
                onClick={() => router.push("/login")}
              >
                Already have an account? Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
