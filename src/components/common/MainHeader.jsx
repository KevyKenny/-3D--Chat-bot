"use client";
import React from 'react';
import styles from '../../app/page.module.css'; // Adjust if necessary
import { usePathname, useRouter } from "next/navigation";
import Image from 'next/image';
import useStore from '@/stores/useStore';
import "./MainHeader.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const MainHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { profile } = useStore(state => ({
    profile: state.profile,
  }));

  const getInitials = (name) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    return nameParts.map(part => part.charAt(0).toUpperCase()).join('');
  };

  return (
    <header className={`d-flex justify-content-between align-items-center p-3 ${styles.header}`}>
      <div>
        <a
          href="#"
          style={{ color: "grey" }}
          onClick={() => {
            if (pathname === "/home") {
              router.push("/train-model");
            } else {
              router.push("/home");
            }
          }}
        >
          <div className="main_logo_home2 text-center">
            <Image
              width={130}
              height={80}
              className="logo2 img-fluid mt10"
              src={"/assets/logos/logo.png"}
              alt="logo"
            />
          </div>
        </a>
      </div>
      {profile ? (
        <div
          className="profile-avatar"
          onClick={() => {
            if (pathname === "/home" && profile.role === "Admin") {
              router.push("/train-model");
            } else if(!profile) {
              router.push("/signup");
            } else {
              router.push("/home");
            }
          }}
        >
          <a href="#" style={{ color: "grey" }}>
            <div className="profile-avatar">
              <div className="initials">
                {getInitials(profile?.first_name)}
                {getInitials(profile?.last_name)}
              </div>
            </div>
          </a>
        </div>
      ) : (
        <div className="profile-avatar">
          <a
            href="#"
            style={{color:"grey"}}
            aerial-label="Login"
            onClick={() => router.push("/login")}
            className={
              pathname === "/login"
                ? "ui-active"
                : "inactive-mobile-menu"
            }
          >
            <FontAwesomeIcon icon={faUserCircle} size="2x" />
          </a>
        </div>
      )}
    </header>
  );
}

export default MainHeader;
