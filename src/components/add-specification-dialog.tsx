import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { toast } from 'sonner'

interface AddSpecificationDialogProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (spec: any) => Promise<any>
  isLoading?: boolean
}

export function AddSpecificationDialog({
  isOpen,
  onClose,
  onAdd,
  isLoading = false,
}: AddSpecificationDialogProps) {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [rangeFrom, setRangeFrom] = useState('')
  const [rangeTo, setRangeTo] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Ensure name is provided (required), but others can be optional
    if (!name) {
      toast.error('Please fill out the specification name');
      return;
    }
  
    console.log('Form data:', { name, value, rangeFrom, rangeTo });
  
    // Create the specification object, including optional fields
    const specification = {
      name,
      value: value || undefined,  // If value is empty, send it as undefined
      rangeFrom: rangeFrom || undefined,  // If rangeFrom is empty, send it as undefined
      rangeTo: rangeTo || undefined,  // If rangeTo is empty, send it as undefined
    };
  
    // Check if all fields are empty
    if (!specification.value && !specification.rangeFrom && !specification.rangeTo) {
      toast.error('Please fill out at least one optional field');
      return;
    }
  
    // Pass the valid specification object to the onAdd function
    await onAdd(specification);
    setName('');
    setValue('');
    setRangeFrom('');
    setRangeTo('');
  };
  
  

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="bg-white fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <Dialog.Title className="text-lg font-semibold">
            Add Specification
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=""
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Value</label>
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder=""
                
              />
            </div>
            <div>
              <label className="text-sm font-medium">From</label>
              <Input
                value={rangeFrom}
                onChange={(e) => setRangeFrom(e.target.value)}
                placeholder=""
                
              />
            </div>
            <div>
              <label className="text-sm font-medium">To</label>
              <Input
                value={rangeTo}
                onChange={(e) => setRangeTo(e.target.value)}
                placeholder=""
                
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add'}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

