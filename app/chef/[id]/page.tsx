import { ChefProfile } from "@/components/chefs/chef-profile"

interface ChefProfilePageProps {
  params: {
    id: string
  }
}

export default function ChefProfilePage({ params }: ChefProfilePageProps) {
  return <ChefProfile chefId={params.id} />
}
