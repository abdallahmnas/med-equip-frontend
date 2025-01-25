import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  isLoading?: boolean;
}

export function DeleteConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  isLoading,
}: DeleteConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div style={{ backgroundColor: "#ffffff", padding: "5px" }}>
          <DialogHeader>
            <div className="flex items-center gap-3 text-destructive">
              <AlertTriangle className="h-6 w-6" />
              <DialogTitle>{title}</DialogTitle>
            </div>
            <DialogDescription className="pt-3">
              {description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Deleting...
                </div>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
// import * as Dialog from '@radix-ui/react-dialog'
// import { AlertTriangle } from 'lucide-react'
// import { Button } from './ui/button'

// interface DeleteDialogProps {
//   isOpen: boolean
//   onClose: () => void
//   onConfirm: () => void
//   title: string
//   description: string
//   isLoading?: boolean
// }

// export function DeleteDialog({
//   isOpen,
//   onClose,
//   onConfirm,
//   title,
//   description,
//   isLoading = false,
// }: DeleteDialogProps) {
//   return (
//     <Dialog.Root open={isOpen} onOpenChange={onClose}>
//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
//         <Dialog.Content className="bg-white fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
//           <div className="flex flex-col space-y-2 text-center sm:text-left">
//             <Dialog.Title className="flex items-center gap-2 text-lg font-semibold leading-none tracking-tight">
//               <AlertTriangle className="h-5 w-5 text-destructive" />
//               {title}
//             </Dialog.Title>
//             <Dialog.Description className="text-sm text-muted-foreground">
//               {description}
//             </Dialog.Description>
//           </div>
//           <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
//             <Button
//               variant="outline"
//               onClick={onClose}
//               disabled={isLoading}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={onConfirm}
//               disabled={isLoading}
//             >
//               {isLoading ? 'Deleting...' : 'Delete'}
//             </Button>
//           </div>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   )
// }
