import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface SensorData {
    id: number;
    temperature: number;
    humidity: number;
    pressure: number;
    location_id: number;
    created_at: string;
    location_name: string;
}

interface SensorChartsProps {
    data: SensorData[];
}

export default function SensorCharts({ data }: SensorChartsProps) {
    // Función para convertir fecha del formato 'd-m-y H:i' a objeto Date
    const parseDate = (dateStr: string): Date => {
        const [datePart, timePart] = dateStr.split(' ');
        const [day, month, year] = datePart.split('-');
        const [hour, minute] = timePart.split(':');
        
        // Nota: los meses en JavaScript son 0-based (0-11)
        return new Date(2000 + parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));
    };

    // Función para agrupar datos en intervalos de 30 segundos
    const groupDataBy30Seconds = (data: SensorData[]) => {
        const groups = new Map();
        
        data.forEach(reading => {
            const date = parseDate(reading.created_at);
            // Redondear al intervalo de 30 segundos más cercano
            date.setSeconds(Math.floor(date.getSeconds() / 30) * 30);
            date.setMilliseconds(0);
            const key = date.toISOString();

            if (!groups.has(key)) {
                groups.set(key, {
                    temperature: [],
                    humidity: [],
                    pressure: [],
                    created_at: key
                });
            }
            
            const group = groups.get(key);
            group.temperature.push(reading.temperature);
            group.humidity.push(reading.humidity);
            group.pressure.push(reading.pressure);
        });

        return Array.from(groups.values()).map(group => ({
            created_at: group.created_at,
            temperature: group.temperature.reduce((a: number, b: number) => a + b, 0) / group.temperature.length,
            humidity: group.humidity.reduce((a: number, b: number) => a + b, 0) / group.humidity.length,
            pressure: group.pressure.reduce((a: number, b: number) => a + b, 0) / group.pressure.length
        }));
    };

    // Ordenar y agrupar los datos
    const sortedData = [...data].sort((a, b) => parseDate(a.created_at).getTime() - parseDate(b.created_at).getTime());
    const groupedData = groupDataBy30Seconds(sortedData);

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Gráfico de Temperatura */}
            <Card>
                <CardHeader>
                    <CardTitle>Temperatura</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={groupedData}>
                            <XAxis
                                dataKey="created_at"
                                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                                fontSize={12}
                            />
                            <YAxis
                                dataKey="temperature"
                                label={{ value: '°C', position: 'insideLeft', angle: -90 }}
                                fontSize={12}
                            />
                            <Tooltip
                                labelFormatter={(value) => `Fecha: ${new Date(value).toLocaleString()}`}
                                formatter={(value) => [`${Number(value).toFixed(1)}°C`, 'Temperatura']}
                            />
                            <Line
                                type="monotone"
                                dataKey="temperature"
                                stroke="var(--chart-1)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Gráfico de Humedad */}
            <Card>
                <CardHeader>
                    <CardTitle>Humedad</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={groupedData}>
                            <XAxis
                                dataKey="created_at"
                                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                                fontSize={12}
                            />
                            <YAxis
                                dataKey="humidity"
                                label={{ value: '%', position: 'insideLeft', angle: -90 }}
                                fontSize={12}
                            />
                            <Tooltip
                                labelFormatter={(value) => `Fecha: ${new Date(value).toLocaleString()}`}
                                formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Humedad']}
                            />
                            <Line
                                type="monotone"
                                dataKey="humidity"
                                stroke="var(--chart-2)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Gráfico de Presión */}
            <Card>
                <CardHeader>
                    <CardTitle>Presión</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={groupedData}>
                            <XAxis
                                dataKey="created_at"
                                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                                fontSize={12}
                            />
                            <YAxis
                                dataKey="pressure"
                                label={{ value: 'Pa', position: 'insideLeft', angle: -90 }}
                                fontSize={12}
                            />
                            <Tooltip
                                labelFormatter={(value) => `Fecha: ${new Date(value).toLocaleString()}`}
                                formatter={(value) => [`${Number(value).toFixed(1)} Pa`, 'Presión']}
                            />
                            <Line
                                type="monotone"
                                dataKey="pressure"
                                stroke="var(--chart-3)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
