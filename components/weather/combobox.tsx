"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn, fetcher } from "@/lib/utils";
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
import { useEffect, useState } from "react";
import { ILocation, IShortLocation, PageDto } from "@/lib/interfaces";
import { useDebouncedCallback } from "use-debounce";
import useSWRImmutable from "swr/immutable";

export function LocationCombobox({
  defaultSelectedLocation,
}: {
  defaultSelectedLocation?: ILocation;
}) {
  const [selectedLocation, setSelectedLocation] = useState<
    IShortLocation | undefined | null
  >(defaultSelectedLocation);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!open) {
      setSearchTerm("");
    }
  }, [open]);

  useEffect(() => {
    setIsTyping(false);
  }, [searchTerm]);

  const { data, isLoading } = useSWRImmutable<PageDto<IShortLocation>>(
    `http://localhost:5000/locations${searchTerm ? "?name=" + searchTerm : ""}`,
    fetcher,
  );

  const debouncedSetSearchTerm = useDebouncedCallback((term: string) => {
    setSearchTerm(term);
  }, 300);

  const handleValueChange = (value: string) => {
    setIsTyping(true);
    debouncedSetSearchTerm(value);
  };

  const handleCommandItemHover = (item: IShortLocation) => {
    if (item.code !== selectedLocation?.code) {
      router.prefetch(`/weather/${item.code}`);
    } else {
      router.prefetch(`/weather`);
    }
  };

  const handleCommandItemSelect = (item: IShortLocation) => {
    setOpen(false);
    if (item.code !== selectedLocation?.code) {
      setSelectedLocation(item);
      router.push(`/weather/${item.code}`);
    } else {
      setSelectedLocation(null);
      router.push(`/weather`);
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
            {selectedLocation?.name || "Seleccionar municipi"}
          </p>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 sm:w-84 p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Cercar municipi"
            onValueChange={handleValueChange}
          />
          <CommandList>
            <CommandEmpty>
              {(!isLoading && !isTyping && "No s'ha trobat cap municipi") ||
                "Carregant municipis..."}
            </CommandEmpty>
            <CommandGroup>
              {!isLoading &&
                !isTyping &&
                data?.data.map((item) => (
                  <CommandItem
                    key={item.code}
                    value={item.code}
                    onMouseEnter={() => handleCommandItemHover(item)}
                    onSelect={() => handleCommandItemSelect(item)}
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
