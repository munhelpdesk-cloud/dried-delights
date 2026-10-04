import { createFileRoute } from '@tanstack/react-router'
import { ProductFormPage } from '@/components/admin-pages'

export const Route = createFileRoute('/admin/_panel/products/$slug/edit')({
  head: () => ({ meta: [{ title: 'Edit Product | ASM Delights Admin' }] }),
  component: () => {
    const { slug } = Route.useParams()
    return <ProductFormPage slug={slug} />
  },
})
