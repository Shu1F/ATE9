import { redirect } from 'next/navigation';
import type { JSX } from 'react';

export default function AdminIndexPage(): JSX.Element {
  redirect('/admin/dashboard');
}
