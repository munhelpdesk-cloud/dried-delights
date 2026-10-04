import { createFileRoute } from '@tanstack/react-router'
import { OrdersPage } from '@/components/admin-pages'

export const Route = createFileRoute('/admin/_panel/orders/')({
  head: () => ({ meta: [{ title: 'Orders | ASM Delights Admin' }] }),
  component: OrdersPage,
})
