import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <Button variant={"outline"} asChild>
      <Link href={`/weather/080193`}>
        Començar
        <ArrowRight />
      </Link>
    </Button>
  );
}
