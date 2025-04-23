'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const AuthLayout = ({ children }) => {
  const router = useRouter();
  const {isAuthenticated,loading} = useSelector((state)=> state.auth)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) return <p>Loading...</p>

  return isAuthenticated ? <>{children}</> : null
};

export default AuthLayout;