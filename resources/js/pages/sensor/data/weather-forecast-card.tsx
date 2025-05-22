import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WeatherForecast {
    TEMPERATURA: string;
    HUMEDAD: string;
    PRESION: string;
    TIPO_CIELO: string;
}

interface WeatherForecastCardProps {
    data: WeatherForecast;
}

export default function WeatherForecastCard({ data, loading }: { data: WeatherForecast; loading: boolean }) {
    if (loading) {
        return (
            <div className="animate-pulse space-y-2 rounded-lg border p-4 shadow">
                <div className="h-6 w-1/2 rounded bg-gray-300" />
                <div className="h-4 w-1/3 rounded bg-gray-200" />
                <div className="h-4 w-1/4 rounded bg-gray-200" />
                <div className="h-4 w-1/4 rounded bg-gray-200" />
            </div>
        );
    }
    return (
        <Card className="col-span-1 bg-gradient-to-br from-blue-100 via-white to-blue-50 shadow-md">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-900">Predicción del Clima</CardTitle>
                <div className="text-sm text-blue-700">
                    {new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </div>
            </CardHeader>
            <CardContent className="space-y-2 text-blue-800">
                <div className="flex justify-between">
                    <span>🌡️ Temperatura:</span>
                    <span>{parseFloat(data.TEMPERATURA).toFixed(1)} °C</span>
                </div>
                <div className="flex justify-between">
                    <span>💧 Humedad:</span>
                    <span>{parseFloat(data.HUMEDAD).toFixed(1)} %</span>
                </div>
                <div className="flex justify-between">
                    <span>📈 Presión:</span>
                    <span>{parseFloat(data.PRESION).toFixed(1)} hPa</span>
                </div>
                <div className="flex justify-between">
                    <span>🌤️ Cielo:</span>
                    <span>{data.TIPO_CIELO}</span>
                </div>
            </CardContent>
        </Card>
    );
}
