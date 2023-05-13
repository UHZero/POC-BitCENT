import { useState } from "react"

export default function useFormulario<T = any>(startData: T) {
    const [data, setData] = useState<T>(startData)

    function setFeature(feature: string, fn?: Function) {
        return (valueOrEvent: any) => {
            const v = valueOrEvent?.target?.value ?? valueOrEvent
            setData({ ...data, [feature]: fn?.(v) ?? v })
        }
    }

    return {
        data,
        setData,
        setFeature
    }
}