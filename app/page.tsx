import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { generateRandomString } from "@/lib/utils";

export default function Home() {
  return (
    <Button variant={"outline"} asChild>
      <Link href={`/weather/080193?no-cache=${generateRandomString()}`}>
        Començar
        <ArrowRight />
      </Link>
    </Button>
  );
}
