import { createFileRoute } from '@tanstack/react-router'
import { OrderDetailPage } from '@/components/admin-pages'

export const Route = createFileRoute('/admin/_panel/orders/$id')({
  head: () => ({ meta: [{ title: 'Order Details | ASM Delights Admin' }] }),
  component: () => {
    const { id } = Route.useParams()
    return <OrderDetailPage id={id} />
  },
})
