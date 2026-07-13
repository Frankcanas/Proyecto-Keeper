export const BOMBERO_LOGUEADO = {
  nombre: "Javier A. Ortega Ruiz",
  rango: "Sargento de Bomberos",
  placa: "CB-984572",
  estacion: "Estación Central de Bomberos",
  division: "Control de Incendios y Rescate",
  tipoSangre: "O+",
  estado: "Online",
  fotoUrl: "https://images.unsplash.com/photo-1618015358954-115ef1ed1751?auto=format&fit=crop&q=80&w=256&h=256" 
};


export const REPORTES_MOCK = [
  {
    id: 1,
    kpId: 'KP-8821',
    tipo: 'Incendio',
    subtipo: 'Incendio Estructural',
    descripcion: 'Fuego activo en el segundo piso de una bodega de reciclaje. Material plástico e inflamable comprometido con llamas altas.',
    ubicacion: 'Calle 8 # 12-42',
    barrio: 'La Candelaria',
    zona: 'Zona Centro',
    lat: 4.6320,
    lng: -74.0680,
    fecha: new Date(Date.now() - 2 * 60 * 1000), 
    gravedad: 'Alta',
    estadoCaso: 'Caso cerrado', 
    accionPolicia: 'Luis Morales', 
    evidencia: true,
    fotoEvidencia: 'https://images.unsplash.com/photo-1508847154043-be12a3283a0b?auto=format&fit=crop&q=80&w=600', 
    ciudadano: {
      id: 'CC 1.018.472.938',
      nombre: 'Diana Patricia Cruz Medina',
      direccion: 'Calle 8 # 12-42 Apto 302',
      barrio: 'La Candelaria'
    }
  },
  {
    id: 2,
    kpId: 'KP-8819',
    tipo: 'Fugas y Derrames',
    subtipo: 'Fuga de Gas GLP',
    descripcion: 'Fuerte olor a gas en zona comercial. Cilindro estacionario presenta escape en válvula principal.',
    ubicacion: 'Plaza Central',
    barrio: 'Chapinero Centro',
    zona: 'Zona Centro',
    lat: 4.5980,
    lng: -74.0930,
    fecha: new Date(Date.now() - 14 * 60 * 1000), 
    gravedad: 'Alta',
    estadoCaso: 'En revisión',
    accionPolicia: '—',
    evidencia: true,
    fotoEvidencia: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=600', 
    ciudadano: {
      id: 'CC 79.847.291',
      nombre: 'Luis Alberto Morales Gómez',
      direccion: 'Avenida Caracas # 53-80 Local 1',
      barrio: 'Chapinero Centro'
    }
  },
  {
    id: 3,
    kpId: 'KP-8815',
    tipo: 'Rescate y Emergencias',
    subtipo: 'Rescate en Alturas',
    descripcion: 'Operario de limpieza de vidrios suspendido a nivel del piso 12 tras falla técnica en andamio móvil.',
    ubicacion: 'Zona Industrial',
    barrio: 'Usaquén Industrial',
    zona: 'Zona Norte',
    lat: 4.6860,
    lng: -74.0480,
    fecha: new Date(Date.now() - 42 * 60 * 1000), 
    gravedad: 'Alta',
    estadoCaso: 'Caso cerrado',
    accionPolicia: '—',
    evidencia: false,
    fotoEvidencia: null,
    ciudadano: {
      id: 'CC 1.036.782.910',
      nombre: 'Carlos Mario Restrepo Ortiz',
      direccion: 'Calle 100 # 19-45 Int 4',
      barrio: 'Usaquén'
    }
  },
  {
    id: 4,
    kpId: 'KP-8810',
    tipo: 'Incendio',
    subtipo: 'Incendio Vehicular',
    descripcion: 'Automóvil de transporte público arde en llamas sobre carril exclusivo debido a falla en el sistema eléctrico.',
    ubicacion: 'Avenida 42 # 10-15',
    barrio: 'Las Nieves',
    zona: 'Zona Centro',
    lat: 4.6010,
    lng: -74.0720,
    fecha: new Date(Date.now() - 120 * 60 * 1000), 
    gravedad: 'Alta',
    estadoCaso: 'En revisión',
    accionPolicia: '—',
    evidencia: true,
    fotoEvidencia: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=600', 
    ciudadano: {
      id: 'CC 52.987.342',
      nombre: 'Sandra Milena Rojas Soto',
      direccion: 'Carrera 7 # 12-50 Local 3',
      barrio: 'Las Nieves'
    }
  },
  {
    id: 5,
    kpId: 'KP-8805',
    tipo: 'Fugas y Derrames',
    subtipo: 'Derrame de Combustible',
    descripcion: 'Volcamiento de camión cisterna con vertido de hidrocarburos sobre la calzada pública. Riesgo inminente de ignición.',
    ubicacion: 'Carrera 15 # 82-10',
    barrio: 'El Lago',
    zona: 'Zona Norte',
    lat: 4.6670,
    lng: -74.0550,
    fecha: new Date(Date.now() - 12 * 24 * 3600 * 1000), 
    gravedad: 'Media',
    estadoCaso: 'visto',
    accionPolicia: '—',
    evidencia: true,
    fotoEvidencia: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600', 
    ciudadano: {
      id: 'CC 80.124.957',
      nombre: 'Andrés Felipe Restrepo Prada',
      direccion: 'Carrera 15 # 82-12',
      barrio: 'El Lago'
    }
  },
  {
    id: 6,
    kpId: 'KP-8802',
    tipo: 'Rescate y Emergencias',
    subtipo: 'Rescate Animal',
    descripcion: 'Gato atrapado en copa de árbol de gran altura desde hace 2 días sin posibilidad de descenso autónomo.',
    ubicacion: 'Avenida Suba # 118-20',
    barrio: 'Niza Sur',
    zona: 'Zona Norte',
    lat: 4.7010,
    lng: -74.0750,
    fecha: new Date(Date.now() - 25 * 24 * 3600 * 1000), 
    gravedad: 'Media',
    estadoCaso: 'Pendiente',
    accionPolicia: '—',
    evidencia: false,
    fotoEvidencia: null,
    ciudadano: {
      id: 'CC 39.756.281',
      nombre: 'Martha Lucía Beltrán Tobón',
      direccion: 'Avenida Suba # 118-20 Apto 501',
      barrio: 'Niza Sur'
    }
  },
  {
    id: 7,
    kpId: 'KP-8801',
    tipo: 'Fugas y Derrames',
    subtipo: 'Fuga de Gas GLP',
    descripcion: 'Cilindro de gas doméstico de 40 libras con escape activo en cocina residencial multifamiliar.',
    ubicacion: 'Carrera 15 # 80-22',
    barrio: 'Antiguo Country',
    zona: 'Zona Centro',
    lat: 4.6650,
    lng: -74.0580,
    fecha: new Date(Date.now() - 28 * 24 * 3600 * 1000), 
    gravedad: 'Media',
    estadoCaso: 'En revisión',
    accionPolicia: '—',
    evidencia: true,
    fotoEvidencia: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600', 
    ciudadano: {
      id: 'CC 1.020.448.917',
      nombre: 'Juan Camilo Herrera Rojas',
      direccion: 'Calle 81 # 14-55',
      barrio: 'Antiguo Country'
    }
  }
];
