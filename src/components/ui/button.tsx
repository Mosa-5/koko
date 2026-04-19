import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@/lib/utils"

const buttonVariants = cva(
    "border-2 text-lg tracking-wider italic shadow-[4px_4px_0_0_black] cursor-pointer inline-block font-semibold text-center no-underline select-none transition-all duration-[133ms] focus:outline-none focus-visible:outline-none hover:shadow-[1px_1px_0_0_black] hover:translate-x-[3px] hover:translate-y-[3px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
    {
        variants: {
            variant: {
                default:
                    "flex items-center justify-center bg-main-color border-black text-background-color",
                destructive:
                    "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
                outline:
                    "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "flex items-center justify-center bg-neutral-200 border-[black] text-[black] shadow-[4px_4px_0_0_black]",
                ghost:
                    "flex items-center justify-center bg-transparent border-0 shadow-none text-black hover:shadow-none hover:translate-x-0 hover:translate-y-0 active:shadow-none active:translate-x-0 active:translate-y-0",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2 rounded-md has-[>svg]:px-3 md:px-6",
                sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-sm",
                md: "h-8 rounded-md gap-2 px-4 has-[>svg]:px-3 text-md",
                lg: "h-11 rounded-md px-4 has-[>svg]:px-4 text-lg min-w-[120px]",
                icon: "size-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

function Button({
                    className,
                    variant,
                    size,
                    asChild = false,
                    ...props
                }: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
    asChild?: boolean
}) {
    const Comp = asChild ? Slot : "button"

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({variant, size, className}))}
            {...props}
        />
    )
}

export {Button, buttonVariants}
