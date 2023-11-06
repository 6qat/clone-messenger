'use client';
import React from 'react';
import { signOut } from 'next-auth/react';

const Users = () => {
  return (
    <button
      onClick={() => {
        signOut().then(() => {
          console.log('Signed out');
        });
      }}
    >
      Logout
    </button>
  );
};

export default Users;
