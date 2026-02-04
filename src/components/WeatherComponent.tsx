import { Cloud, CloudRain, Sun, Wind, Droplets, Eye } from 'lucide-react';

interface WeatherData {
    condition: string;
    temp: number;
    humidity: number;
    windSpeed: number;
    visibility: number;
    feelsLike: number;
}

interface ForecastDay {
    date: string;
    high: number;
    low: number;
    condition: string;
    precipitation: number;
}

interface WeatherComponentProps {
    currentWeather: WeatherData;
    forecast: ForecastDay[];
}

export default function WeatherComponent({ currentWeather, forecast }: WeatherComponentProps) {
    const getWeatherIcon = (condition: string) => {
        switch (condition.toLowerCase()) {
            case 'sunny':
            case 'clear':
                return <Sun className="w-8 h-8 text-yellow-500" />;
            case 'cloudy':
            case 'overcast':
                return <Cloud className="w-8 h-8 text-gray-500" />;
            case 'rainy':
            case 'rain':
                return <CloudRain className="w-8 h-8 text-blue-500" />;
            default:
                return <Cloud className="w-8 h-8 text-gray-400" />;
        }
    };

    return (
        <div className="space-y-4 md:space-y-6">
            {/* Current Weather */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl md:rounded-2xl border-2 border-blue-200 p-4 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Current Weather</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    {/* Main Weather Display */}
                    <div className="flex items-center justify-center">
                        <div className="text-center">
                            <div className="flex justify-center mb-3 md:mb-4">
                                {getWeatherIcon(currentWeather.condition)}
                            </div>
                            <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                                {currentWeather.temp}°C
                            </div>
                            <p className="text-lg md:text-xl text-gray-700 font-semibold mb-2">
                                {currentWeather.condition}
                            </p>
                            <p className="text-sm md:text-base text-gray-600">
                                Feels like {currentWeather.feelsLike}°C
                            </p>
                        </div>
                    </div>

                    {/* Weather Details */}
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <div className="bg-white rounded-lg p-3 md:p-4 border border-blue-100">
                            <div className="flex items-center gap-2 mb-1 md:mb-2">
                                <Droplets className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                                <p className="text-xs md:text-sm font-medium text-gray-600">Humidity</p>
                            </div>
                            <p className="text-xl md:text-2xl font-bold text-gray-900">
                                {currentWeather.humidity}%
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-3 md:p-4 border border-blue-100">
                            <div className="flex items-center gap-2 mb-1 md:mb-2">
                                <Wind className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                                <p className="text-xs md:text-sm font-medium text-gray-600">Wind Speed</p>
                            </div>
                            <p className="text-xl md:text-2xl font-bold text-gray-900">
                                {currentWeather.windSpeed} km/h
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-3 md:p-4 border border-blue-100">
                            <div className="flex items-center gap-2 mb-1 md:mb-2">
                                <Eye className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                                <p className="text-xs md:text-sm font-medium text-gray-600">Visibility</p>
                            </div>
                            <p className="text-xl md:text-2xl font-bold text-gray-900">
                                {currentWeather.visibility} km
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-3 md:p-4 border border-blue-100">
                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                                UV Index
                            </p>
                            <p className="text-xl md:text-2xl font-bold text-gray-900">
                                3
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 7-Day Forecast */}
            <div className="bg-white rounded-xl md:rounded-2xl border-2 border-gray-200 p-4 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">7-Day Forecast</h2>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {forecast.map((day, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 md:p-4 border border-gray-200 hover:shadow-lg transition"
                        >
                            <p className="text-xs md:text-sm font-bold text-gray-700 mb-2 md:mb-3">
                                {new Date(day.date).toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </p>

                            <div className="flex justify-center mb-2 md:mb-3">
                                {getWeatherIcon(day.condition)}
                            </div>

                            <p className="text-xs text-gray-600 text-center mb-2 capitalize">
                                {day.condition}
                            </p>

                            <div className="flex justify-between items-center mb-2">
                                <div className="text-center flex-1">
                                    <p className="text-xs text-gray-500">High</p>
                                    <p className="text-base md:text-lg font-bold text-gray-900">{day.high}°</p>
                                </div>
                                <div className="text-center flex-1">
                                    <p className="text-xs text-gray-500">Low</p>
                                    <p className="text-base md:text-lg font-bold text-gray-900">{day.low}°</p>
                                </div>
                            </div>

                            <div className="bg-blue-50 rounded p-1.5 md:p-2 text-center">
                                <p className="text-xs text-blue-700">
                                    {day.precipitation}% rain
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
