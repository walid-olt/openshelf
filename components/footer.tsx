function Footer() {
  return (
    <footer className="border-t border-border py-4 text-center">
      <p className="text-sm text-muted-foreground">
        OpenShelf &middot; {new Date().getFullYear()}
      </p>
    </footer>
  )
}

export default Footer
