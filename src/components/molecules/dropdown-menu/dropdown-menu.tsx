import React from 'react'

// import { Button } from '../button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  //   DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './dropdown-menu-components'
import { DropdownMenuProps } from './dropdown-menu.types'

export function Dropdown({
  trigger,
  optionGroups,
  header = 'My Account',
  dropdownContentProps = {},
  container,
}: DropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-light-1 w-56 shadow-lg  rounded-[8px]"
        container={container}
        {...dropdownContentProps}
      >
        {/* label section (string/jsx) */}
        {header && (
          <>
            <DropdownMenuLabel>{header}</DropdownMenuLabel>
            <DropdownMenuSeparator className="border-t border-neutral-1" />
          </>
        )}
        {optionGroups.map((options, groupIndex) => {
          return (
            <React.Fragment key={groupIndex}>
              <DropdownMenuGroup>
                {options.map((option, optionIndex) => {
                  if (option.subItems) {
                    return (
                      <DropdownMenuSub key={optionIndex}>
                        <DropdownMenuSubTrigger
                          disabled={option['disabled']}
                          className={`data-[disabled]:hover:bg-light-1 hover:bg-light-2 rounded-md py-[11px] px-4 cursor-pointer data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed ${option.className}`}
                        >
                          {option.icon}
                          <span className="text-xs">{option.label}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent className="bg-light-1">
                            {option.subItems?.map((subItem, subItemIndex) => (
                              <DropdownMenuItem
                                disabled={subItem?.disabled}
                                className={` data-[disabled]:hover:bg-light-1 hover:bg-light-2  data-[disabled]:cursor-not-allowed py-[11px] px-4 rounded-md ${subItem.className}`}
                                onClick={subItem.onClick}
                                key={subItemIndex}
                              >
                                {subItem.icon}
                                <span className="text-xs">{subItem.label}</span>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    )
                  }
                  return (
                    <DropdownMenuItem
                      className={`data-[disabled]:hover:bg-light-1 hover:bg-light-2 data-[disabled]:cursor-not-allowed hover:rounded-md py-[11px] px-4 h-[42px] ${option.className}`}
                      onClick={option.onClick}
                      disabled={option['disabled']}
                      key={optionIndex}
                    >
                      {option.icon}
                      <span className="text-xs">{option.label}</span>

                      {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuGroup>
              {groupIndex + 1 !== optionGroups.length && (
                <DropdownMenuSeparator className="border-t border-neutral-1" />
              )}
            </React.Fragment>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
