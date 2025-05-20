import SensorCharts from '@/components/sensor/sensor-charts';
import AppLayout from '@/layouts/app-layout';
import WeatherForecastCard from '@/pages/sensor/data/weather-forecast-card';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface SensorDataItem {
    id: number;
    temperature: number;
    humidity: number;
    pressure: number;
    location_id: number;
    location_name: string;
    created_at: string;
}
interface WeatherForecast {
    TEMPERATURA: string;
    HUMEDAD: string;
    PRESION: string;
    TIPO_CIELO: string;
}

interface DashboardProps {
    sensorData: SensorDataItem[];
}

export default function Dashboard({ sensorData: initialSensorData }: DashboardProps) {
    const [sensorData, setSensorData] = useState(initialSensorData);
    const [forecast, setForecast] = useState<WeatherForecast>({
        TEMPERATURA: '',
        HUMEDAD: '',
        PRESION: '',
        TIPO_CIELO: '',
    });

    const [loadingForecast, setLoadingForecast] = useState(true);

    console.log('Sensor Data:', sensorData);
    // console.log('Predicción Clima:', prediccionClima);
    useEffect(() => {
        // Simula la llamada a tu modelo (reemplaza con tu endpoint real)
        const fetchForecast = async () => {
            try {
                const response = await fetch('/api/prediccion'); // <-- Tu endpoint de modelo
                const data = await response.json();
                setForecast(data);
            } catch (error) {
                console.error('Error al obtener predicción:', error);
            } finally {
                setLoadingForecast(false);
            }
        };

        fetchForecast();
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Gráficos de sensores */}
                <div className="grid auto-rows-min gap-4">
                    <SensorCharts data={sensorData} />
                </div>

                {/* Espacio para contenido adicional */}
                <div className="md:col-span-1">
                    {loadingForecast ? (
                        <div className="animate-pulse space-y-2 rounded-lg border p-4 shadow">
                            <div className="h-6 w-1/2 rounded bg-gray-300" />
                            <div className="h-4 w-1/3 rounded bg-gray-200" />
                            <div className="h-4 w-1/4 rounded bg-gray-200" />
                            <div className="h-4 w-1/4 rounded bg-gray-200" />
                        </div>
                    ) : forecast ? (
                        <WeatherForecastCard data={forecast} />
                    ) : (
                        <div className="rounded border p-4 text-red-600 shadow">Error al cargar la predicción</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
