import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: '/users',
    },
];

interface User {
    id: number;
    name: string;
    identification_number: number;
    email: string;
}

export default function Index({ users }: { users: User[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />

            <div className="mr-2 ml-2 flex items-center justify-between py-4">
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-200">Usuarios</h1>
                <Button asChild>
                    <Link href={route('register')}>Register</Link>
                </Button>
            </div>

            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Numero de Identificacion</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.identification_number}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Button asChild>
                                        <Link href={route('register')}>Editar</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
