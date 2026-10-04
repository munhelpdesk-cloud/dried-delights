import { createFileRoute } from '@tanstack/react-router'
import { ReportsPage } from '@/components/admin-pages'

export const Route = createFileRoute('/admin/_panel/reports')({
  head: () => ({ meta: [{ title: 'Reports & Analytics | ASM Delights Admin' }] }),
  component: ReportsPage,
})
