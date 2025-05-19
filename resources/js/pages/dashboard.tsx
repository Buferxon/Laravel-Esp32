import SensorCharts from '@/components/sensor/sensor-charts';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
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
interface PrediccionClima {
    TEMPERATURA: string;
    HUMEDAD: string;
    PRESION: string;
    TIPO_CIELO: string;
}
interface DashboardProps {
    sensorData: SensorDataItem[];
    prediccion: PrediccionClima;
}

export default function Dashboard({ sensorData: initialSensorData, prediccion }: DashboardProps) {
    const [sensorData, setSensorData] = useState<SensorDataItem[]>(initialSensorData);
    const [error, setError] = useState<string | null>(null);
    const [prediccionClima, setPrediccionClima] = useState<PrediccionClima | null>(prediccion);

    console.log('Sensor Data:', sensorData);
    console.log('Predicción Clima:', prediccionClima);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/dashboard/sensor-data');
                setSensorData(response.data.sensorData);
                setError(null);
            } catch (err) {
                setError('Error al actualizar los datos del sensor');
                console.error('Error fetching sensor data:', err);
            }
        };

        // Actualizar datos cada 30 segundos
        const interval = setInterval(fetchData, 30000);

        // Limpiar intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, []); // Array vacío significa que el efecto se ejecuta solo al montar el componente

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Gráficos de sensores */}
                <div className="grid auto-rows-min gap-4">
                    {error && <div className="rounded-lg bg-red-100 p-4 text-red-700 dark:bg-red-900/30 dark:text-red-400">{error}</div>}
                    <SensorCharts data={sensorData} />
                </div>

                {/* Espacio para contenido adicional */}

                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between rounded-lg bg-blue-100 p-4 shadow-md">
                        <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-200">Predicción del Clima</h2>
                    </div>
                    {prediccionClima && (
                        <div className="rounded-lg bg-blue-100 p-4 shadow-md">
                            <p>Temperatura: {prediccionClima.TEMPERATURA}</p>
                            <p>Humedad: {prediccionClima.HUMEDAD}</p>
                            <p>Presión: {prediccionClima.PRESION}</p>
                            <p>Tipo de Cielo: {prediccionClima.TIPO_CIELO}</p>
                        </div>
                    )}
                    {!prediccionClima && (
                        <div className="rounded-lg bg-red-100 p-4 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                            No hay predicción del clima disponible.
                        </div>
                    )}
                </div>
                {/* <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[50vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div> */}
            </div>
        </AppLayout>
    );
}
