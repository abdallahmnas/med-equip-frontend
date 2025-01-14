import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Trash2, Upload } from 'lucide-react'
import * as Select from '@radix-ui/react-select'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { MainLayout } from '../../components/layout'
import { useEquipment } from '../../contexts/EquipmentContext'

// interface EquipmentEditProps {
//   id: string
// }

export function EquipmentEdit() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {id} = useParams()
  const {equipment} = useEquipment()
  const [formData, setFormData] = useState({
    name: equipment.name || "",
    category: equipment.category.name || "",
    description: equipment.description || "",
    specifications: equipment.specifications || [],
    keywords: equipment.keywords || [],
    images: equipment.images || [],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Equipment updated successfully')
      navigate(`/equipments/${id}`)
    } catch (error) {
      toast.error('Failed to update equipment')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // Handle image upload logic here
      toast.info('Image upload functionality would go here')
    }
  }

  return (
    <MainLayout title="">
    <div className="container mx-auto max-w-5xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </button>
        <h1 className="text-2xl font-semibold">Edit Equipment</h1>
        <div className="w-[52px]" /> {/* Spacer for alignment */}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-lg font-medium">Basic Information</h2>
          <div className="grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full rounded-md border bg-background px-3 py-2"
              />
            </div>
            {/* <div>
              <label className="mb-2 block text-sm font-medium">Category{JSON.stringify(formData.category)}</label>
              <Select.Root
                value={formData.category}
                onValueChange={value => setFormData(prev => ({ ...prev, category: value }))}
              >
                <Select.Trigger className="w-full rounded-md border bg-background px-3 py-2 text-left">
                  <Select.Value />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="rounded-md border bg-popover shadow-md">
                    <Select.Viewport>
                      <Select.Item value="category1" className="cursor-pointer px-3 py-2 hover:bg-accent">
                        <Select.ItemText>Category 1</Select.ItemText>
                      </Select.Item>
                      <Select.Item value="category2" className="cursor-pointer px-3 py-2 hover:bg-accent">
                        <Select.ItemText>Category 2</Select.ItemText>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div> */}
          </div>
        </div>

        {/* Product Description */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-lg font-medium">Description</h2>
          <textarea
            value={formData.description}
            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            className="w-full rounded-md border bg-background px-3 py-2"
          />
        </div>

        {/* Specifications & Keywords */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-lg font-medium">Specifications & Keywords</h2>
          <div className="grid gap-4">
            {Object.entries(formData.specifications).map(([key, value, rangeFrom, rangeTo]) => (
              <div key={key} className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={key}
                  className="rounded-md border bg-background px-3 py-2"
                  placeholder="Key"
                  onChange={e => {
                    const newSpecs = { ...formData.specifications }
                    delete newSpecs[key]
                    newSpecs[e.target.value] = value
                    setFormData(prev => ({ ...prev, specifications: newSpecs }))
                  }}
                />
                <input
                  type="text"
                  value={value as string || ""}
                  className="rounded-md border bg-background px-3 py-2"
                  placeholder="Value"
                  onChange={e => {
                    setFormData(prev => ({
                      ...prev,
                      specifications: {
                        ...prev.specifications,
                        [key]: e.target.value
                      }
                    }))
                  }}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  specifications: {
                    ...prev.specifications,
                    '': ''
                  }
                }))
              }}
              className="mt-2 text-sm text-primary hover:text-primary/80"
            >
              + Add Specification
            </button>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium">Keywords</label>
            <input
              type="text"
              value={formData.keywords.join(', ')}
              onChange={e => {
                const keywords = e.target.value.split(',').map(k => k.trim()).filter(Boolean)
                setFormData(prev => ({ ...prev, keywords }))
              }}
              className="w-full rounded-md border bg-background px-3 py-2"
              placeholder="Enter keywords separated by commas"
            />
          </div>
        </div>

        {/* Images */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-lg font-medium">Images</h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              {formData.images.map((image: any, index: number) => (
                <div key={index} className="relative aspect-video rounded-lg border bg-muted">
                  <img
                    src={image.url}
                    alt={`Equipment ${index + 1}`}
                    className="h-full w-full rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index)
                      }))
                    }}
                    className="absolute right-2 top-2 rounded-full bg-background/80 p-1 hover:bg-background"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <label className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed p-6 hover:border-primary">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <span className="mt-2 block text-sm text-muted-foreground">
                  Click to upload
                </span>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-md px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Cancel
          </button>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </motion.button>
        </div>
      </form>
    </div>
    </MainLayout>
  )
}

