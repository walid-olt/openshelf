import Link from "next/link"
import type { Route } from "next"
import { WarningIcon } from "@phosphor-icons/react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  title?: string
  message?: string
  actionLabel?: string
  actionHref?: Route
}

function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  actionLabel = "Back to catalog",
  actionHref = "/",
}: ErrorStateProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4">
      <Alert variant="destructive" className="max-w-sm">
        <WarningIcon />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      <Button
        variant="ghost"
        size="sm"
        nativeButton={false}
        render={<Link href={actionHref}>{actionLabel}</Link>}
        className="mt-4"
      />
    </div>
  )
}

export { ErrorState }
