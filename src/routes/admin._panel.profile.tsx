import { createFileRoute } from '@tanstack/react-router'
import { ProfilePage } from '@/components/admin-pages'

export const Route = createFileRoute('/admin/_panel/profile')({
  head: () => ({ meta: [{ title: 'Profile Settings | ASM Delights Admin' }] }),
  component: ProfilePage,
})
