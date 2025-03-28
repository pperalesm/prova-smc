"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn, generateRandomString } from "@/lib/utils";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { test } from "@/actions/test";

export interface ILocation {
  code: string;
  name: string;
}

export function LocationCombobox({
  code,
  defaultSelectedLocation,
}: {
  code?: string;
  defaultSelectedLocation?: ILocation;
}) {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<
    ILocation | undefined | null
  >(defaultSelectedLocation);
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useSWR(
    `http://localhost:3000/locations`,
    async (): Promise<ILocation[]> => {
      if (code) {
        // Fetch location on mount to get its name
      }

      const testLocations = await test();
      return testLocations as ILocation[];
    },
    {
      revalidateOnMount: true,
      refreshInterval: 0,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    },
  );

  const onCommandItemHover = (item: ILocation) => {
    if (item.code !== selectedLocation?.code) {
      router.prefetch(`/weather/${item.code}`);
    } else {
      router.prefetch(`/weather`);
    }
  };

  const onCommandItemSelect = (item: ILocation) => {
    setOpen(false);
    if (item.code !== selectedLocation?.code) {
      setSelectedLocation(item);
      router.push(`/weather/${item.code}?no-cache=${generateRandomString()}`);
    } else {
      setSelectedLocation(null);
      router.push(`/weather?no-cache=${generateRandomString()}`);
    }
  };

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
            {selectedLocation?.name || "Seleccioni el municipi..."}
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
                  key={item.code}
                  value={item.code}
                  onMouseEnter={() => onCommandItemHover(item)}
                  onSelect={() => onCommandItemSelect(item)}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "h-4 w-4",
                      selectedLocation?.code === item.code
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
