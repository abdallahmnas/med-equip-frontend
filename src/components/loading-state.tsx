import { motion } from "framer-motion"
import { Spinner } from "./ui/spinner"

interface LoadingStateProps {
  message?: string
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[400px] w-full flex-col items-center justify-center gap-4 rounded-lg border bg-card p-8 text-card-foreground shadow-sm"
    >
      <Spinner size="lg" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </motion.div>
  )
}

