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
    // Ordenar los datos por fecha
    const sortedData = [...data].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Gráfico de Temperatura */}
            <Card>
                <CardHeader>
                    <CardTitle>Temperatura</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={sortedData}>
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
                                formatter={(value) => [`${value}°C`, 'Temperatura']}
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
                        <LineChart data={sortedData}>
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
                                formatter={(value) => [`${value}%`, 'Humedad']}
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
                        <LineChart data={sortedData}>
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
                                formatter={(value) => [`${value} Pa`, 'Presión']}
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
