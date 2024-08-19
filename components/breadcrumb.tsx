interface BreadcrumbProps {
    title: string;
    subtitle?: string;
}

export default function Breadcrumb({title, subtitle}:BreadcrumbProps) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-col">
                <h1 className=" text-2xl font-bold">{title}</h1>
                <p>{subtitle}</p>
            </div>
            <div>
                {/* <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[20rem] justify-between"
              >
                {value
                  ? setores.find((framework) => framework.value === value)?.label
                  : "Select framework..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Selecione o Setor" />
                <CommandList>
                  <CommandEmpty>Setor não encontrado</CommandEmpty>
                  <CommandGroup>
                    {setores.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === framework.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover> */}
            </div>
        </div>
    )
}