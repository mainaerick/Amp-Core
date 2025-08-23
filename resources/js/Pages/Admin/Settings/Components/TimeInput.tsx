import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TimeInputProps {
    defaultValue?: string
    label?: string
    disabled?: boolean
}

export function TimeInput({ defaultValue = "00:00", label, disabled = false }: TimeInputProps) {
    const [time, setTime] = useState(defaultValue)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime(e.target.value)
    }

    return (
        <div className="flex flex-col space-y-1">
            {label && <Label className="sr-only">{label}</Label>}
            <Input
                type="time"
                value={time}
                onChange={handleChange}
                className="w-[120px]"
                disabled={disabled}
                aria-label={label}
            />
        </div>
    )
}
