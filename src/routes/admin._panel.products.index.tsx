import { createFileRoute } from '@tanstack/react-router'
import { ProductsPage } from '@/components/admin-pages'

export const Route = createFileRoute('/admin/_panel/products/')({
  head: () => ({ meta: [{ title: 'Inventory & Products | ASM Delights Admin' }] }),
  component: ProductsPage,
})
