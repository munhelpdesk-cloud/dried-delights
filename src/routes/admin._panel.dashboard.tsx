import { createFileRoute } from '@tanstack/react-router'
import { DashboardPage } from '@/components/admin-pages'

export const Route = createFileRoute('/admin/_panel/dashboard')({
  head: () => ({ meta: [{ title: 'Dashboard | ASM Delights Admin' }] }),
  component: DashboardPage,
})
