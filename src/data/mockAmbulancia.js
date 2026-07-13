export const PARAMEDICO_LOGUEADO = {
  nombre: "Javier A. Ortega Ruiz",
  rango: "Paramédico de Emergencias",
  placa: "AP-773829",
  estacion: "Base de Despacho Central",
  division: "Atención Prehospitalaria y Trauma",
  tipoSangre: "O+",
  estado: "Online",
  fotoUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256&h=256" 
};


export const REPORTES_MOCK = [
  {
    id: 1,
    kpId: 'KP-9921',
    tipo: 'Accidente de Tránsito',
    subtipo: 'Colisión Vehicular con Lesionados',
    descripcion: 'Choque múltiple entre bus público y automóvil particular. Dos pacientes politraumatizados con heridas abiertas en extremidades superiores.',
    ubicacion: 'Calle 26 # 68-90',
    barrio: 'Salitre Greco',
    zona: 'Zona Centro',
    lat: 4.6540,
    lng: -74.0950,
    fecha: new Date(Date.now() - 3 * 60 * 1000), 
    gravedad: 'Alta',
    estadoCaso: 'Caso cerrado',
    accionPolicia: 'Carlos Restrepo', 
    evidencia: true,
    fotoEvidencia: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600', 
    ciudadano: {
      id: 'CC 1.018.472.938',
      nombre: 'Diana Patricia Cruz Medina',
      direccion: 'Calle 26 # 68-90 Apto 402',
      barrio: 'Salitre'
    }
  },
  {
    id: 2,
    kpId: 'KP-9919',
    tipo: 'Paro Cardiorespiratorio',
    subtipo: 'Emergencia Cardiovascular',
    descripcion: 'Paciente masculino de 64 años presenta dolor torácico agudo con irradiación a miembro superior izquierdo y pérdida del estado de alerta.',
    ubicacion: 'Avenida 68 # 53-80',
    barrio: 'Chapinero Centro',
    zona: 'Zona Centro',
    lat: 4.5980,
    lng: -74.0930,
    fecha: new Date(Date.now() - 17 * 60 * 1000), 
    gravedad: 'Alta',
    estadoCaso: 'En revisión',
    accionPolicia: '—',
    evidencia: true,
    fotoEvidencia: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600', 
    ciudadano: {
      id: 'CC 79.847.291',
      nombre: 'Luis Alberto Morales Gómez',
      direccion: 'Avenida Caracas # 53-80 Local 1',
      barrio: 'Chapinero Centro'
    }
  },
  {
    id: 3,
    kpId: 'KP-9915',
    tipo: 'Trauma y Caídas',
    subtipo: 'Fractura por Caída',
    descripcion: 'Paciente femenina de 72 años sufre caída desde su propia altura en baño residencial. Evidencia deformidad y dolor agudo en cadera derecha.',
    ubicacion: 'Calle 100 # 19-45',
    barrio: 'Usaquén Industrial',
    zona: 'Zona Norte',
    lat: 4.6860,
    lng: -74.0480,
    fecha: new Date(Date.now() - 48 * 60 * 1000), 
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
    kpId: 'KP-9910',
    tipo: 'Accidente de Tránsito',
    subtipo: 'Choque Simple / Trauma Cervical',
    descripcion: 'Colisión por alcance entre dos vehículos particulares. Conductor de automóvil delantero refiere dolor cervical y mareo moderado.',
    ubicacion: 'Carrera 7 # 45-10',
    barrio: 'Las Nieves',
    zona: 'Zona Centro',
    lat: 4.6010,
    lng: -74.0720,
    fecha: new Date(Date.now() - 150 * 60 * 1000), 
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
    kpId: 'KP-9905',
    tipo: 'Trauma y Caídas',
    subtipo: 'Caída de Altura con Trauma Craneal',
    descripcion: 'Pintor de fachadas cae de andamio a una altura aproximada de 3 metros. Presenta herida contuso-cortante en región occipital y desorientación.',
    ubicacion: 'Autopista Norte # 82-10',
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
    kpId: 'KP-9902',
    tipo: 'Paro Cardiorespiratorio',
    subtipo: 'Pérdida de Conocimiento Súbita',
    descripcion: 'Paciente femenina de 45 años pierde el conocimiento de forma súbita mientras realizaba compras en supermercado. Sin pulso radial perceptible inicialmente.',
    ubicacion: 'Avenida Suba # 115-10',
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
    kpId: 'KP-9901',
    tipo: 'Trauma y Caídas',
    subtipo: 'Herida por Objeto Cortopunzante',
    descripcion: 'Paciente de 28 años herido en muslo izquierdo con objeto metálico cortante durante labores de carpintería. Hemorragia controlada con vendaje de compresión.',
    ubicacion: 'Carrera 15 # 104-10',
    barrio: 'Chicó',
    zona: 'Zona Norte',
    lat: 4.6650,
    lng: -74.0580,
    fecha: new Date(Date.now() - 28 * 24 * 3600 * 1000), 
    gravedad: 'Media',
    estadoCaso: 'En revisión',
    accionPolicia: '—',
    evidencia: true,
    fotoEvidencia: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600', 
    ciudadano: {
      id: 'CC 1.020.448.917',
      nombre: 'Juan Camilo Herrera Rojas',
      direccion: 'Calle 105 # 16-12 Apto 301',
      barrio: 'Chicó'
    }
  }
];
