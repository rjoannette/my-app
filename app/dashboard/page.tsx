'use client';

import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) redirect('/');

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
