import { motion } from "framer-motion"
import { Spinner } from "./ui/spinner"

export function PageLoading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-background"
    >
      <Spinner size="lg" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </motion.div>
  )
}

