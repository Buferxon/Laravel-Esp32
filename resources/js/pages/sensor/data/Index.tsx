import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Head } from '@inertiajs/react';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

const MAX_VISIBLE_PAGES = 5; // Número máximo de páginas a mostrar

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Mediciones',
        href: '/sensor/data',
    },
];
interface SensorData {
    id: number;
    temperature: number;
    humidity: number;
    pressure: number;
    sky_description: string | null;
    location_id: number;
    created_at: string;
    location_name: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedResponse {
    current_page: number;
    data: SensorData[]; // Aquí llegan los datos de los sensores
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[]; // Enlaces de paginación
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}


interface IndexProps {
    sensordata: PaginatedResponse;
    status?: string;
}

export default function Index({ sensordata, status }: IndexProps) {

    // console
    //log de links
    const { current_page, last_page, total, per_page, prev_page_url, next_page_url, links } = sensordata;

    // Filtramos y limitamos el número de páginas visibles
    let visibleLinks = links.slice(1, -1); // Eliminamos "Previous" y "Next"
    if (visibleLinks.length > MAX_VISIBLE_PAGES) {
        const start = Math.max(0, current_page - Math.ceil(MAX_VISIBLE_PAGES / 2));
        const end = Math.min(start + MAX_VISIBLE_PAGES, visibleLinks.length);
        visibleLinks = visibleLinks.slice(start, end);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ubicación de Sensores" />

            <div className="mr-2 ml-2 flex items-center justify-between py-4">
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-200">Mediciones de Sensor</h1>
            </div>

            <Table>
                <TableCaption>Lista de mediciones.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Temperatura °C</TableHead>
                        <TableHead>Humedad %</TableHead>
                        <TableHead>Presión (Pa)</TableHead>
                        <TableHead>Condición del Cielo</TableHead>
                        <TableHead>Ubicación</TableHead>
                        <TableHead>Fecha</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sensordata.data.map((sensor, index) => (
                        <TableRow key={`${sensor.id}-${index}`}>
                            <TableCell>{sensor.temperature}</TableCell>
                            <TableCell>{sensor.humidity}</TableCell>
                            <TableCell>{sensor.pressure}</TableCell>
                            <TableCell>{sensor.sky_description || '-'}</TableCell>
                            <TableCell>{sensor.location_name}</TableCell>
                            <TableCell>{sensor.created_at}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex flex-col gap-4">
                {/* Información adicional */}
                <div className="flex items-center justify-between rounded-lg bg-blue-100 p-4 shadow-md">
                    <span className="text-sm font-medium text-blue-700">
                        Total de páginas: <strong>{last_page}</strong>
                    </span>
                    <span className="text-sm font-medium text-blue-700">
                        Total de registros: <strong>{total}</strong>
                    </span>
                </div>

                {/* Paginación */}
                <Pagination>
                    <PaginationContent>
                        {prev_page_url && (
                            <PaginationItem>
                                <PaginationPrevious href={prev_page_url} />
                            </PaginationItem>
                        )}

                        {/* Agregamos "..." al inicio si es necesario */}
                        {current_page > Math.ceil(MAX_VISIBLE_PAGES / 2) && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        {visibleLinks.map((link, index) => (
                            <PaginationItem key={index}>
                                {link.url ? (
                                    <PaginationLink href={link.url} isActive={link.active}>
                                        {link.label}
                                    </PaginationLink>
                                ) : (
                                    <PaginationEllipsis />
                                )}
                            </PaginationItem>
                        ))}

                        {/* Agregamos "..." al final si es necesario */}
                        {current_page < last_page - Math.ceil(MAX_VISIBLE_PAGES / 2) && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        {next_page_url && (
                            <PaginationItem>
                                <PaginationNext href={next_page_url} />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            </div>
        </AppLayout>
    );
}
