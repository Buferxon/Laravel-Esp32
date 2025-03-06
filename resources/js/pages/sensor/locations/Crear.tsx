import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export function Crear() {
    const [isOpen, setIsOpen] = useState(false);

    // Inicializar el formulario sin valores previos (ya que es para crear)
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        latitude: '',
        longitude: '',
        altitude: '',
    });

    const handleSave: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('locations.store'), {
            onSuccess: () => {
                setIsOpen(false); // Cerrar el modal después de guardar
                reset(); // Resetear el formulario
            },
            preserveScroll: true, // Mantener la posición de la página
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Crear Ubicación</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">Crear una Ubicación</DialogTitle>
                    <DialogDescription>Registra los campos de la ubicación del dispositivo.</DialogDescription>
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
                                step="0.000001"
                                value={data.latitude}
                                onChange={(e) => setData('latitude', e.target.value)}
                                className="col-span-3"
                            />
                            {errors.latitude && <InputError message={errors.latitude} className="col-span-4" />}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="longitude" className="text-right">
                                Longitud
                            </Label>
                            <Input
                                id="longitude"
                                type="number"
                                step="0.000001"
                                value={data.longitude}
                                onChange={(e) => setData('longitude', e.target.value)}
                                className="col-span-3"
                            />
                            {errors.longitude && <InputError message={errors.longitude} className="col-span-4" />}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="altitude" className="text-right">
                                Altitud
                            </Label>
                            <Input
                                id="altitude"
                                type="number"
                                step="0.000001"
                                value={data.altitude}
                                onChange={(e) => setData('altitude', e.target.value)}
                                className="col-span-3"
                            />
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
