import { createFileRoute } from '@tanstack/react-router'
import { ProductFormPage } from '@/components/admin-pages'

export const Route = createFileRoute('/admin/_panel/products/new')({
  head: () => ({ meta: [{ title: 'Add Product | ASM Delights Admin' }] }),
  component: () => <ProductFormPage />,
})
