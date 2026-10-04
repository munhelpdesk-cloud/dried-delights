import { createFileRoute } from '@tanstack/react-router'
import { TransactionsPage } from '@/components/admin-pages'

export const Route = createFileRoute('/admin/_panel/transactions')({
  head: () => ({ meta: [{ title: 'Transactions | ASM Delights Admin' }] }),
  component: TransactionsPage,
})
