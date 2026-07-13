export const feedState = {
  listUsers: [
    {
      id: 1,
      nombre: 'Luis',
      apellido: 'Morales',
      cedula: '1020304506',
      email: 'luis@keeper.com',
      telefono: '+57 320 530 2245',
      fechaNacimiento: '1995-04-12',
      rol: 'Administrador'
    },
    {
      id: 2,
      nombre: 'Marcus',
      apellido: 'J.',
      cedula: '1092834120',
      email: 'marcus@gmail.com',
      telefono: '+57 311 492 8815',
      fechaNacimiento: '1998-11-20',
      rol: 'Usuario'
    },
    {
      id: 3,
      nombre: 'Sarah',
      apellido: 'W.',
      cedula: '1045290381',
      email: 'sarah.w@outlook.com',
      telefono: '+57 315 283 9920',
      fechaNacimiento: '2000-07-05',
      rol: 'Usuario'
    }
  ],

  listReportesFeed: [
    {
      id: '#KP-8821',
      tipo: 'Vandalismo',
      reportadoPor: 'Marcus J.',
      fecha: 'Hace 2 min',
      estado: 'Pendiente',
      accion: '—'
    },
    {
      id: '#KP-8819',
      tipo: 'Vehículo Sospechoso',
      reportadoPor: 'Sarah W.',
      fecha: 'Hace 14 min',
      estado: 'En revisión',
      accion: '—'
    },
    {
      id: '#KP-8815',
      tipo: 'Falla de Energía',
      reportadoPor: 'Sensor Automático',
      fecha: 'Hace 42 min',
      estado: 'Completado',
      accion: '—'
    }
  ],

  showingThreeDays: false,

  data30Days: {
    trend: '+12.4% vs mes anterior',
    bars: ['60%', '70%', '50%', '80%', '90%', '60%', '70%'],
    active: '28',
    responseTime: '4m 12s',
    sectores: { norte: 42, central: 29, industrial: 64 },
    reports: [
      { id: '#KP-8821', tipo: 'Vandalismo', reportadoPor: 'Marcus J.', fecha: 'Hace 2 min', estado: 'Pendiente', accion: '—' },
      { id: '#KP-8819', tipo: 'Vehículo Sospechoso', reportadoPor: 'Sarah W.', fecha: 'Hace 14 min', estado: 'En revisión', accion: '—' },
      { id: '#KP-8815', tipo: 'Falla de Energía', reportadoPor: 'Sensor Automático', fecha: 'Hace 42 min', estado: 'Completado', accion: '—' }
    ]
  },

  data3Days: {
    trend: '+18.2% vs semana anterior',
    bars: ['20%', '35%', '30%', '50%', '95%', '90%', '85%'],
    active: '9',
    responseTime: '2m 45s',
    sectores: { norte: 12, central: 8, industrial: 22 },
    reports: [
      { id: '#KP-8821', tipo: 'Vandalismo', reportadoPor: 'Marcus J.', fecha: 'Hace 2 min', estado: 'Pendiente', accion: '—' }
    ]
  },

  listHistorialReportes: [
    {
      id: '#KP-8821',
      tipo: 'Vandalismo',
      descripcion: 'Graffiti y rayados en la fachada del centro comunitario.',
      ubicacion: 'Calle 8 #12-42',
      fecha: 'Hace 2 min',
      estado: 'Pendiente',
      evidencia: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800',
      accion: '—'
    },
    {
      id: '#KP-8819',
      tipo: 'Vehículo Sospechoso',
      descripcion: 'Camioneta polarizada estacionada sospechosamente durante varias horas sin conductor.',
      ubicacion: 'Plaza Central',
      fecha: 'Hace 14 min',
      estado: 'En revisión',
      evidencia: null,
      accion: '—'
    },
    {
      id: '#KP-8815',
      tipo: 'Falla de Energía',
      descripcion: 'Corte total de suministro eléctrico en la manzana principal del cuadrante.',
      ubicacion: 'Zona Industrial',
      fecha: 'Hace 42 min',
      estado: 'Completado',
      evidencia: null,
      accion: '—'
    },
    {
      id: '#KP-8810',
      tipo: 'Robo a Mano Armada',
      descripcion: 'Asalto con arma de fuego a transeúnte cerca de la parada de autobús.',
      ubicacion: 'Avenida 42 #10-15',
      fecha: 'Hace 2 horas',
      estado: 'En revisión',
      evidencia: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800',
      accion: '—'
    }
  ]
};
