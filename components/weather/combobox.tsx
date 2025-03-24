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
import { useRouter, useParams } from "next/navigation";
import { test } from "@/actions/test";
import { useEffect, useState } from "react";

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
  slug: string;
}

export function LocationCombobox() {
  const router = useRouter();
  const { location } = useParams<{ location?: string }>();
  const [selectedLocation, setSelectedLocation] = useState<
    ILocation | undefined
  >();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selectedLocation && location !== selectedLocation.slug) {
      router.push(`/weather/${selectedLocation.slug}`);
    }
  }, [selectedLocation, location, router]);

  useSWR(
    `http://localhost:3000/location/${location}`,
    async () => {
      if (selectedLocation || !location) return;

      setSelectedLocation({
        codi: "",
        nom: "REAL NAME",
        coordenades: { latitud: 0, longitud: 0 },
        comarca: { codi: 0, nom: "" },
        slug: location,
      });
    },
    {
      revalidateOnMount: true,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    },
  );

  const { data, isLoading } = useSWR(
    `http://localhost:3000/weather`,
    async (): Promise<ILocation[]> => {
      const json = await test();

      return json as ILocation[];
    },
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-40 sm:w-84 justify-between cursor-pointer"
        >
          <p className="text-start text-ellipsis grow overflow-hidden">
            {selectedLocation?.nom || "Seleccioni el municipi..."}
          </p>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 sm:w-84 p-0">
        <Command>
          <CommandInput placeholder="Cercar municipi" />
          <CommandList>
            <CommandEmpty>
              {(isLoading && "Carregant municipis...") ||
                "No s'ha trobat cap municipi"}
            </CommandEmpty>
            <CommandGroup>
              {data?.map((item) => (
                <CommandItem
                  key={item.nom}
                  value={item.slug}
                  onSelect={(selectedValue) => {
                    if (selectedValue !== selectedLocation?.slug) {
                      setSelectedLocation(item);
                    }
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "h-4 w-4",
                      selectedLocation?.slug === item.slug
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {item.nom}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
