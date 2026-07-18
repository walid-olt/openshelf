import { BeatLoader } from "react-spinners"

function PageLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-3">
      <BeatLoader color="var(--muted-foreground)" size={10} />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  )
}

export { PageLoader }
