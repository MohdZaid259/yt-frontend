'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import LoadingLine from '../Loading';

const AuthLayout = ({ children }) => {
  const router = useRouter();
  const {isAuthenticated,loading} = useSelector((state)=> state.auth)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) return <LoadingLine/>

  return isAuthenticated ? <>{children}</> : null
};

export default AuthLayout;