export default function Page() {
  console.debug("Rendering Weather Page at " + new Date().toISOString());

  return (
    <p className="text-center text-muted-foreground">
      No s&apos;ha seleccionat cap municipi
    </p>
  );
}
