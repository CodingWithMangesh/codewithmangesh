import { HomeLayout } from "fumadocs-ui/layouts/home"
import { baseOptions } from "@/lib/layout.shared"

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <>{children}</>
    // <HomeLayout {...baseOptions()} className="hidden">
    // </HomeLayout>
  )
}
