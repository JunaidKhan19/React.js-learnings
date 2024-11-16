import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`);
                if (!response.ok) throw new Error("Network response was not ok");
                const result = await response.json();

                if (result && result[currency]) {
                    setData(result[currency]);
                } else {
                    console.warn("Unexpected data format:", result);
                    setData({});
                }
            } catch (err) {
                console.error("Error fetching currency data:", err);
            }
        };
        fetchData();
    }, [currency]);

    return data;
}

export default useCurrencyInfo;
