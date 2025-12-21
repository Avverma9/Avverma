import { useEffect, useState } from "react"
import baseUrl from '../baseUrl'
export const useBedTypes = () => {
    const [bedTypes, setBedTypes] = useState([])
    useEffect(() => {
        fetch(`${baseUrl}/additional/get-bed`)
            .then((res) => res.json())
            .then((data) => setBedTypes(data))
    }, [])

    return bedTypes
}