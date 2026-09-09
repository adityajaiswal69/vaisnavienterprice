import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950">
      <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />
      <div className="sheen absolute inset-0" aria-hidden />

      <div className="relative mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="font-display text-6xl text-gold-400/60">404</p>
        <h1 className="mt-6 font-display text-3xl text-white sm:text-4xl">
          That page is not in the catalogue.
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-steel-400">
          The page you were looking for has moved or never existed. Our product range is
          a good place to pick the thread back up.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/products" variant="gold">
            View products
          </Button>
          <Button href="/" variant="ghost">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
