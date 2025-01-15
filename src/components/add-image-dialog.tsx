import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { Button } from './ui/button'
import { Upload, X } from 'lucide-react'

interface AddImageDialogProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (files: FileList) => Promise<void>
  isLoading?: boolean
}

export function AddImageDialog({
  isOpen,
  onClose,
  onAdd,
  isLoading = false,
}: AddImageDialogProps) {
  const [files, setFiles] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (files) {
      await onAdd(files)
      setFiles(null)
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <Dialog.Title className="text-lg font-semibold">
            Add Images
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-primary">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={(e) => setFiles(e.target.files)}
              />
            </label>
            {files && files.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Selected Files:</h4>
                {Array.from(files).map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md border p-2"
                  >
                    {/* <span className="text-sm">{file.url}</span> */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFiles(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || !files}>
                {isLoading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

