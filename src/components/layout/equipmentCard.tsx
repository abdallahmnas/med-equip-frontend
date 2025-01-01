import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"


interface EquipmentCardProps {
  name: string
  category: string
  imageUrl: string
  onViewDetails: () => void
}

export function EquipmentCard({ name, category, imageUrl, onViewDetails }: EquipmentCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-square w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-1">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Name: {name}</p>
            <p className="text-sm text-muted-foreground">Category: {category}</p>
          </div>
          <Button
            variant="outline"
            className="w-full mt-4 text-[#2A7C7C] border-[#2A7C7C] hover:bg-[#2A7C7C] hover:text-white"
            onClick={onViewDetails}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

