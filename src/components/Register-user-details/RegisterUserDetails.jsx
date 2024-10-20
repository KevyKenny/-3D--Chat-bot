"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../app/page.module.css"; // Adjust if necessary
import useStore from "@/stores/useStore";

const RegisterUserDetails = () => {
  const router = useRouter();

  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    role: "",
    street_address: "",
    city: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const { createNewUser } = useStore((state) => ({
    createNewUser: state.createNewUser,
  }));

  const handleRegisterDetails = async (e) => {
    e.preventDefault();
    const { first_name, last_name, phone, role, street_address, city, country } = userDetails;

    if (!first_name || !last_name || !phone || !role || !street_address || !city || !country) {
      console.log("Please fill in all fields.");
      return;
    }

    const res = await createNewUser(userDetails);
    if (res?.error) {
      console.log(res.error);
    } else {
      console.log("User details updated successfully!");
      router.push("/train-model");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(/assets/images/auth.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div className={`container d-flex justify-content-center align-items-center ${styles.main}`}>
        <div className="card p-4" style={{ width: "90%" }}>
          <h2 className="text-center">Complete Your Registration</h2>
          <form onSubmit={handleRegisterDetails}>
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="text"
                name="first_name"
                placeholder="First Name"
                value={userDetails.first_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={userDetails.last_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={userDetails.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="text"
                name="role"
                placeholder="Role (e.g., Buyer, Seller, Agent)"
                value={userDetails.role}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="text"
                name="street_address"
                placeholder="Street Address"
                value={userDetails.street_address}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="text"
                name="city"
                placeholder="City"
                value={userDetails.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                className="form-control"
                type="text"
                name="country"
                placeholder="Country"
                value={userDetails.country}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <button className="btn btn-success btn-block form-control" type="submit">
                Submit Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUserDetails;
