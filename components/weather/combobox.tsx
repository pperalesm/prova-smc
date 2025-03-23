"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useSWR from "swr";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { test } from "@/actions/test";

export interface ILocation {
  codi: string;
  nom: string;
  coordenades: {
    latitud: number;
    longitud: number;
  };
  comarca: {
    codi: number;
    nom: string;
  };
  slug: string | null;
}

export function LocationCombobox() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const location = searchParams.get("location");

  const { data, isLoading } = useSWR(
    `http://localhost:3000/weather`,
    async (): Promise<ILocation[]> => {
      const json = await test();

      return json as ILocation[];
    },
  );

  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-84 justify-between cursor-pointer"
        >
          {location || "Seleccioni el municipi..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-84 p-0">
        <Command>
          <CommandInput placeholder="Cercar municipi" />
          <CommandList>
            <CommandEmpty>
              {(isLoading && "Carregant municipis...") ||
                "No s'ha trobat cap municipi"}
            </CommandEmpty>
            <CommandGroup>
              {data?.map((value) => (
                <CommandItem
                  key={value.nom}
                  value={value.nom}
                  onSelect={(selectedValue) => {
                    router.push(
                      selectedValue === location
                        ? pathname
                        : `${pathname}?location=${selectedValue}`,
                    );
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "h-4 w-4",
                      location === value.nom ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {value.nom}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
