import Transacao from "@/logic/core/financas/Transacao"
import { useState } from "react"

export default function useFormulario(startData: Transacao) {
    const [data, setData] = useState(startData)

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