'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const AuthLayout = ({ children }) => {
  const router = useRouter();
  const user = useSelector((state)=> state.auth?.isAuthenticated)
  const loading = useSelector((state)=> state.auth?.loading)

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>

  return user ? <>{children}</> : null
};

export default AuthLayout;