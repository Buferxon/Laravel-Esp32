import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';
interface Location {
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    altitude: number;
}

interface EditarProps {
    location: Location;
    onSave: (updatedLocation: Location) => void;
}

export function Editar({ location, onSave }: EditarProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const { data, setData, put, processing, errors, reset } = useForm({
        id: location.id,
        name: location.name,
        description: location.description,
        latitude: location.latitude,
        longitude: location.longitude,
        altitude: location.altitude,
    });

    const handleSave: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('locations.update', { location: data.id }), {
            onSuccess: () => {
                onSave(data); // Notificar al componente padre que se guardó
                setIsOpen(false); // Cerrar el diálogo
                reset(); // Resetear el formulario
            },
            preserveScroll: true, // Preservar la posición de la página
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Editar</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">Editar Ubicación</DialogTitle>
                    <DialogDescription>Edita los datos de los campos que necesites.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSave}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nombre
                            </Label>
                            <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="col-span-3" />

                            {errors.name && <InputError message={errors.name} className="col-span-4" />}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Descripción
                            </Label>
                            <Input
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="col-span-3"
                            />
                            {errors.description && <InputError message={errors.description} className="col-span-4" />}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="latitude" className="text-right">
                                Latitud
                            </Label>
                            <Input
                                id="latitude"
                                type="number"
                                value={data.latitude}
                                onChange={(e) => setData('latitude', parseFloat(e.target.value))}
                                className="col-span-3"
                            />
                            <p className="text-muted-foreground col-span-4 text-center text-[0.8rem]">Ingresa la latitud en grados decimales.</p>
                            {errors.latitude && <InputError message={errors.latitude} className="col-span-4" />}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="longitude" className="text-right">
                                Longitud
                            </Label>
                            <Input
                                id="longitude"
                                type="number"
                                value={data.longitude}
                                onChange={(e) => setData('longitude', parseFloat(e.target.value))}
                                className="col-span-3"
                            />
                            <p className="text-muted-foreground col-span-4 text-center text-[0.8rem]">Ingresa la longitud en grados decimales.</p>

                            {errors.longitude && <InputError message={errors.longitude} className="col-span-4" />}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="altitude" className="text-right">
                                Altitud
                            </Label>
                            <Input
                                id="altitude"
                                type="number"
                                value={data.altitude}
                                onChange={(e) => setData('altitude', parseFloat(e.target.value))}
                                className="col-span-3"
                            />
                            <p className="text-muted-foreground col-span-4 text-center text-[0.8rem]">Ingresa la altura en grados decimales.</p>

                            {errors.altitude && <InputError message={errors.altitude} className="col-span-4" />}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
