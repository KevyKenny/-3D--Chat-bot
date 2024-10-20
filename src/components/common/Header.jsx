"use client";
import React from 'react';
import styles from '../../app/page.module.css'; // Adjust if necessary
import { useRouter } from "next/navigation";
import Image from 'next/image';
import useStore from '@/stores/useStore';
import "./MainHeader.css";

const MainHeader = () => {
  const router = useRouter();
  const { profile } = useStore(state => ({
    profile: state.profile,
  }));

  // Function to get initials from the user's name
  const getInitials = (name) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    return nameParts.map(part => part.charAt(0).toUpperCase()).join('');
  };

  return (
    <header className={`d-flex justify-content-between align-items-center p-3 ${styles.header}`}>
      {/* Back Button */}
      <div>
        <button
          style={{ color: "grey", background: "none", border: "none", fontSize: "1.2rem" }}
          onClick={() => router.back()} // Takes the user to the previous URL
        >
          ← Back
        </button>
      </div>

      {/* User Profile Section */}
      <div className="profile-avatar d-flex align-items-center">
        {profile && (
          <>
            <div className="initials">
              {getInitials(profile?.first_name)}{getInitials(profile?.last_name)}
            </div>
            <div className="profile-details ml-2">
              <p>{profile.first_name} {profile.last_name}</p>
              <small>{profile.email}</small>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default MainHeader;
