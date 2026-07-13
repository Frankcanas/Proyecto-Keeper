import { feedState } from './feedState.js';
import Swal from 'sweetalert2';

export function renderReportesFeedTable() {
  const tbody = document.getElementById('reportes-feed-table-body');
  if (!tbody) return;

  tbody.innerHTML = feedState.listReportesFeed.map(report => `
    <tr class="hover:bg-zinc-50/50 transition-colors">
      <td class="py-4 pr-4 font-semibold text-zinc-955">${report.id}</td>
      <td class="py-4 pr-4 text-zinc-800 font-medium">${report.tipo}</td>
      <td class="py-4 pr-4 text-zinc-500">${report.reportadoPor}</td>
      <td class="py-4 pr-4 text-zinc-500">${report.fecha}</td>
      <td class="py-4 pr-4">
        <select data-id="${report.id}" class="select-report-estado text-[10px] font-semibold border rounded px-2 py-0.5 cursor-pointer focus:outline-none ${
          report.estado === 'Pendiente' ? 'bg-orange-50 text-orange-700 border-orange-200' :
          report.estado === 'En revisión' ? 'bg-blue-50 text-blue-700 border-blue-200' :
          'bg-emerald-50 text-emerald-700 border-emerald-200'
        }">
          <option value="Pendiente" ${report.estado === 'Pendiente' ? 'selected' : ''} class="bg-white text-zinc-800">Pendiente</option>
          <option value="En revisión" ${report.estado === 'En revisión' ? 'selected' : ''} class="bg-white text-zinc-800">En revisión</option>
          <option value="Completado" ${report.estado === 'Completado' ? 'selected' : ''} class="bg-white text-zinc-800">Completado</option>
        </select>
      </td>
      <td class="py-4 font-medium ${report.accion !== '—' ? 'text-zinc-855 font-semibold' : 'text-zinc-400'}">${report.accion}</td>
    </tr>
  `).join('');

  // Escuchar cambios de estado
  document.querySelectorAll('.select-report-estado').forEach(select => {
    select.addEventListener('change', (e) => {
      const id = select.dataset.id;
      const report = feedState.listReportesFeed.find(r => r.id === id);
      if (report) {
        report.estado = e.target.value;
        report.accion = 'Luis Morales'; 
        renderReportesFeedTable();

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: `Reporte ${id} actualizado por Luis Morales`,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          customClass: { popup: 'rounded border border-zinc-200 bg-white font-sans text-xs' }
        });
      }
    });
  });
}

export function renderHistorialReportesTable() {
  const tbody = document.getElementById('historial-reportes-table-body');
  if (!tbody) return;

  tbody.innerHTML = feedState.listHistorialReportes.map(report => `
    <tr class="hover:bg-zinc-50/50 transition-colors">
      <td class="py-4 pr-4 font-semibold text-zinc-955">${report.id}</td>
      <td class="py-4 pr-4 text-zinc-800 font-medium">${report.tipo}</td>
      <td class="py-4 pr-4 text-zinc-650 max-w-xs truncate font-medium" title="${report.descripcion || '—'}">${report.descripcion || '—'}</td>
      <td class="py-4 pr-4 text-zinc-500">${report.ubicacion}</td>
      <td class="py-4 pr-4 text-zinc-500">${report.fecha}</td>
      <td class="py-4 pr-4">
        <select data-id="${report.id}" class="select-historial-estado text-[10px] font-semibold border rounded px-2 py-0.5 cursor-pointer focus:outline-none ${
          report.estado === 'Pendiente' ? 'bg-orange-50 text-orange-700 border-orange-200' :
          report.estado === 'En revisión' ? 'bg-blue-50 text-blue-700 border-blue-200' :
          'bg-emerald-50 text-emerald-700 border-emerald-200'
        }">
          <option value="Pendiente" ${report.estado === 'Pendiente' ? 'selected' : ''} class="bg-white text-zinc-800">Pendiente</option>
          <option value="En revisión" ${report.estado === 'En revisión' ? 'selected' : ''} class="bg-white text-zinc-800">En revisión</option>
          <option value="Completado" ${report.estado === 'Completado' ? 'selected' : ''} class="bg-white text-zinc-800">Completado</option>
        </select>
      </td>
    </tr>
  `).join('');

  // Escuchar cambios de estado en el historial
  document.querySelectorAll('.select-historial-estado').forEach(select => {
    select.addEventListener('change', (e) => {
      const id = select.dataset.id;
      const report = feedState.listHistorialReportes.find(r => r.id === id);
      if (report) {
        report.estado = e.target.value;
        report.accion = 'Luis Morales'; // Auditoría local sencilla
        renderHistorialReportesTable();

        // Sincronizar con la tabla simplificada de la pestaña Estadísticas si existe allí también
        const simpleReport = feedState.listReportesFeed.find(r => r.id === id);
        if (simpleReport) {
          simpleReport.estado = e.target.value;
          simpleReport.accion = 'Luis Morales';
          renderReportesFeedTable();
        }

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: `Reporte ${id} actualizado en el historial`,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          customClass: { popup: 'rounded border border-zinc-200 bg-white font-sans text-xs' }
        });
      }
    });
  });
}
