import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Editar } from '@/pages/sensor/Editar';
import { Head, Link } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ubicaciones',
        href: '/sensor/locations',
    },
];

interface Location {
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    altitude: number;
    created_at: string;
}

interface IndexProps {
    locations: Array<Location>;
    status?: string;
    onSave: (updatedLocation: Location) => void;
}

export default function Index({ locations, status }: IndexProps) {
    const handleSave = (updatedLocation: Omit<Location, 'created_at'>) => {
        console.log('Ubicación actualizada:', updatedLocation);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ubicacion de Sensores" />

            <div className="mr-2 ml-2 flex items-center justify-between py-4">
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-200">Ubicacion de Sensores</h1>
                <Button asChild>
                    <Link href="/sensor/locations/create">Crear Ubicacion</Link>
                </Button>
            </div>

            <div className="ml-2">
                <Table>
                    <TableCaption>Lista de ubicaciones de los sensores.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Id</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Descripcion</TableHead>
                            <TableHead>Latitud</TableHead>
                            <TableHead>Longitud</TableHead>
                            <TableHead>Altura</TableHead>
                            <TableHead>Fecha de Creacion</TableHead>
                            <TableHead className="w-[100px]">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {locations.map((location) => (
                            // console.log(location),
                            <TableRow key={location.id}>
                                <TableCell className="font-medium">{location.id}</TableCell>
                                <TableCell>{location.name}</TableCell>
                                <TableCell>{location.description}</TableCell>
                                <TableCell>{location.latitude}</TableCell>
                                <TableCell>{location.longitude}</TableCell>
                                <TableCell>{location.latitude}</TableCell>
                                <TableCell>{location.created_at}</TableCell>
                                <TableCell>
                                    <Editar location={location} onSave={handleSave} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
