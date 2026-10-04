import { createFileRoute } from '@tanstack/react-router'
import { CustomersPage } from '@/components/admin-pages'

export const Route = createFileRoute('/admin/_panel/customers')({
  head: () => ({ meta: [{ title: 'Customers | ASM Delights Admin' }] }),
  component: CustomersPage,
})
