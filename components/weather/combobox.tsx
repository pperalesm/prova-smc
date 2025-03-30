"use client";

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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ILocation, IShortLocation, PageDto } from "@/lib/api";
import { useDebouncedCallback } from "use-debounce";
import useSWRImmutable from "swr/immutable";
import { API } from "@/lib/api";
import { fetcher } from "@/lib/api";
import { APP } from "@/lib/routes";
import { useTranslations } from "next-intl";

export interface ILocationComboboxProps {
  defaultSelectedLocation?: ILocation;
}

export function LocationCombobox({
  defaultSelectedLocation,
}: ILocationComboboxProps) {
  const t = useTranslations("LocationCombobox");
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
    `${API.BASE_URL}${API.ENDPOINTS.LOCATIONS}?${API.PARAMS.NAME(searchTerm)}`,
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
      router.prefetch(APP.ROUTES.WEATHER_BY_CODE(item.code));
    } else {
      router.prefetch(APP.ROUTES.WEATHER);
    }
  };

  const handleCommandItemSelect = (item: IShortLocation) => {
    setOpen(false);
    if (item.code !== selectedLocation?.code) {
      setSelectedLocation(item);
      router.push(APP.ROUTES.WEATHER_BY_CODE(item.code));
    } else {
      setSelectedLocation(null);
      router.push(APP.ROUTES.WEATHER);
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
            {selectedLocation?.name || t("noLocationSelected")}
          </p>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 sm:w-84 p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={t("searchLocation")}
            onValueChange={handleValueChange}
          />
          <CommandList>
            <CommandEmpty>
              {(!isLoading && !isTyping && t("noLocationFound")) ||
                t("loadingLocations")}
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
