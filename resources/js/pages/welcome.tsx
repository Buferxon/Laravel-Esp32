import SensorCharts from '@/components/sensor/sensor-charts';
import WeatherForecastCard from '@/pages/sensor/data/weather-forecast-card';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
interface SensorData {
    id: number;
    temperature: number;
    humidity: number;
    pressure: number;
    location_id: number;
    created_at: string;
    location_name: string;
}

interface WeatherForecast {
    TEMPERATURA: string;
    HUMEDAD: string;
    PRESION: string;
    TIPO_CIELO: string;
}

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [loadingForecast, setLoadingForecast] = useState(true);
    const [sensorData, setSensorData] = useState<SensorData[]>([]);

    const [forecast, setForecast] = useState<WeatherForecast>({
        TEMPERATURA: '',
        HUMEDAD: '',
        PRESION: '',
        TIPO_CIELO: '',
    });

    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                const response = await fetch('/api/sensor');
                const data = await response.json();
                // console.log('Sensor Data:', data);
                setSensorData(data.data); // Si usas paginación Laravel, asegúrate de acceder a `data.data`
            } catch (error) {
                console.error('Error al obtener datos del sensor:', error);
            }
        };

        fetchSensorData();
    }, []);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const response = await fetch('/api/sensor/prediccion'); // <-- Tu endpoint de modelo
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
        <div className="bg-[] flex min-h-screen flex-col items-center p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
            <header className="mb-6 w-full text-sm">
                <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4">
                    {/* Logo a la izquierda */}
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/logo.svg" alt="Logo" className="h-8 w-auto dark:invert" />
                    </Link>

                    {/* Acciones a la derecha */}
                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="grid auto-rows-min gap-4">
                        <h2 className="text-xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Temperaturas actuales</h2>
                        <SensorCharts data={sensorData} />
                    </div>

                    {/* Espacio para contenido adicional */}

                    {loadingForecast ? (
                        <div className="animate-pulse ...">[...]</div>
                    ) : (
                        <WeatherForecastCard data={forecast} loading={loadingForecast} />
                    )}
                </div>
            </div>
        </div>
    );
}
