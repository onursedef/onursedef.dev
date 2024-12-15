import { Moon, Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from "lucide-react";
import { useEffect, useState } from "react"

export const WeatherAndTime = () => {
    const [weather, setWeather] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            const istanbulTime = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Europe/Istanbul',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            }).format(new Date());
            setTime(istanbulTime);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        fetch("https://api.open-meteo.com/v1/forecast?latitude=41.027&longitude=28.6773&current=rain,showers,snowfall,weather_code&forecast_days=1", {
            method: "GET",
        }).then((response) => {
            response.json().then((data) => {
                console.log(data);
                switch (data.current.weather_code) {
                    case 0:
                        setWeather("Clear")
                        break;
                    case 1:
                    case 2:
                    case 3:
                        setWeather("Partly Cloudy")
                        break;
                    case 45:
                    case 48:
                        setWeather("Fog")
                        break;
                    case 51:
                    case 53:
                    case 55:
                        setWeather("Rain Drizzle")
                        break;
                    case 61:
                    case 63:
                    case 65:
                    case 80:
                    case 81:
                    case 82:
                        setWeather("Rain")
                        break;
                    case 71:
                    case 73:
                    case 75:
                    case 85:
                    case 86:
                        setWeather("Snow")
                        break;
                    case 95:
                    case 96:
                    case 99:
                        setWeather("Thunderstorm")
                        break;
                }
            })
        })
            .catch((error) => {
                console.error(error)
            })
    }, []);

    return (
        <div className="bg-black/70 px-3 pt-3 pb-2 rounded-md hover:bg-black/80 transition-colors w-fit">
            <div className="inline-flex gap-3 items-center text-sm whitespace-nowrap flex-shrink-0">
                <div className=" relative inline-flex items-center" >
                    <div className="group relative inline-block">
                        <div className={`absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out`}>
                            <div className="relative">
                                <div className="bg-neutral-900 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap shadow-md">
                                    {weather}
                                </div>
                            </div>
                        </div>
                        {weather?.toLocaleLowerCase() === "clear" && (time?.toLocaleLowerCase().includes("am") ? <Moon className="size-6 text-white" /> : <Sun className="size-6 text-white" />)}
                        {weather?.toLocaleLowerCase() === "partly cloudy" && <Cloud className="size-6 text-white" />}
                        {weather?.toLocaleLowerCase() === "rain" && <CloudRain className="size-6 text-white" />}
                        {weather?.toLocaleLowerCase() === "snow" && <CloudSnow className="size-6 text-white" />}
                        {weather?.toLocaleLowerCase() === "thunderstorm" && <CloudLightning className="size-6 text-white" />}
                    </div>
                </div>
                <span>{time} IST, TR</span>
            </div>
        </div>
    )
}