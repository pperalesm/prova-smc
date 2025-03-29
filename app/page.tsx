import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { APP } from "@/lib/routes";

export default function Home() {
  return (
    <Button variant={"outline"} asChild>
      <Link href={APP.ROUTES.BARCELONA_WEATHER}>
        Començar
        <ArrowRight />
      </Link>
    </Button>
  );
}
