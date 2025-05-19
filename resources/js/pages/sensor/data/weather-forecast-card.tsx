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

export default function WeatherForecastCard({ data }: WeatherForecastCardProps) {
    return (
        <Card className="col-span-1 bg-gradient-to-br from-blue-100 via-white to-blue-50 shadow-md">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-900">Predicción del Clima</CardTitle>
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
