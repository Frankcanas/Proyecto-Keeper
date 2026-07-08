export function renderFeed() {
  return `
    <section class="min-h-screen bg-slate-50 text-slate-900">
      <div class="max-w-7xl mx-auto px-6 py-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p class="text-sm uppercase tracking-[0.24em] text-slate-500">Dashboard</p>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900">Strategic Overview</h1>
            <p class="mt-2 text-sm text-slate-500">Real-time incident tracking and community safety metrics.</p>
          </div>
          <div class="flex flex-wrap gap-3">
            <button class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100">Last 30 Days</button>
            <button class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">Export Data</button>
          </div>
        </div>

        <div class="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
          <div class="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
            <div class="flex items-center justify-between gap-4 mb-6">
              <div>
                <p class="text-xs uppercase tracking-[0.3em] text-slate-400">Safety Confidence Index</p>
              </div>
              <div class="text-sm font-semibold text-orange-500">+12.4% vs Prev Month</div>
            </div>
            <div class="grid gap-4">
              <div class="grid grid-cols-7 gap-2 items-end h-48">
                <div class="col-span-1 flex flex-col items-center gap-2"><div class="h-24 w-full rounded-t-3xl bg-slate-300"></div><span class="text-[10px] uppercase text-slate-400">Mon</span></div>
                <div class="col-span-1 flex flex-col items-center gap-2"><div class="h-28 w-full rounded-t-3xl bg-slate-300"></div><span class="text-[10px] uppercase text-slate-400">Tue</span></div>
                <div class="col-span-1 flex flex-col items-center gap-2"><div class="h-20 w-full rounded-t-3xl bg-slate-300"></div><span class="text-[10px] uppercase text-slate-400">Wed</span></div>
                <div class="col-span-1 flex flex-col items-center gap-2"><div class="h-32 w-full rounded-t-3xl bg-slate-300"></div><span class="text-[10px] uppercase text-slate-400">Thu</span></div>
                <div class="col-span-1 flex flex-col items-center gap-2"><div class="h-36 w-full rounded-t-3xl bg-black"></div><span class="text-[10px] uppercase text-slate-400">Fri</span></div>
                <div class="col-span-1 flex flex-col items-center gap-2"><div class="h-24 w-full rounded-t-3xl bg-slate-300"></div><span class="text-[10px] uppercase text-slate-400">Sat</span></div>
                <div class="col-span-1 flex flex-col items-center gap-2"><div class="h-28 w-full rounded-t-3xl bg-slate-300"></div><span class="text-[10px] uppercase text-slate-400">Sun</span></div>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div class="rounded-[30px] border border-slate-200 bg-black p-6 text-white shadow-sm">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-xs uppercase tracking-[0.3em] text-slate-400">Active Incidents Reported</p>
                  <p class="mt-3 text-5xl font-black">28</p>
                </div>
                <span class="rounded-full bg-orange-500 px-3 py-2 text-xs font-semibold uppercase">Live</span>
              </div>
              <p class="mt-5 text-sm text-slate-400">Avg. Response Time</p>
              <p class="mt-1 text-lg font-semibold">4m 12s</p>
            </div>

            <div class="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <p class="text-xs uppercase tracking-[0.3em] text-slate-400">Incidents by Sector</p>
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <div class="flex items-center justify-between text-sm font-semibold text-slate-700 mb-2"><span>North Sector</span><span>42</span></div>
                  <div class="h-3 rounded-full bg-slate-200 overflow-hidden"><div class="h-full w-[42%] rounded-full bg-slate-900"></div></div>
                </div>
                <div>
                  <div class="flex items-center justify-between text-sm font-semibold text-slate-700 mb-2"><span>Central Plaza</span><span>29</span></div>
                  <div class="h-3 rounded-full bg-slate-200 overflow-hidden"><div class="h-full w-[29%] rounded-full bg-slate-900"></div></div>
                </div>
                <div>
                  <div class="flex items-center justify-between text-sm font-semibold text-slate-700 mb-2"><span>Industrial Zone</span><span>64</span></div>
                  <div class="h-3 rounded-full bg-slate-200 overflow-hidden"><div class="h-full w-[64%] rounded-full bg-orange-500"></div></div>
                </div>
                <div>
                  <div class="flex items-center justify-between text-sm font-semibold text-slate-700 mb-2"><span>West Residential</span><span>12</span></div>
                  <div class="h-3 rounded-full bg-slate-200 overflow-hidden"><div class="h-full w-[12%] rounded-full bg-slate-900"></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="text-sm uppercase tracking-[0.24em] text-slate-500">Moderation Queue</p>
              <p class="text-xs text-slate-400">Filter incidents...</p>
            </div>
            <div class="rounded-full border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-700">View All Activity →</div>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full text-left text-sm text-slate-700">
              <thead class="border-b border-slate-200 text-slate-500">
                <tr>
                  <th class="py-3 pr-6">ID</th>
                  <th class="py-3 pr-6">Type</th>
                  <th class="py-3 pr-6">Reporter</th>
                  <th class="py-3 pr-6">Timestamp</th>
                  <th class="py-3 pr-6">Status</th>
                  <th class="py-3 pr-6">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                <tr class="bg-slate-50">
                  <td class="py-4 pr-6 font-semibold text-slate-900">#KP-8821</td>
                  <td class="py-4 pr-6 flex items-center gap-2 text-slate-700"><span class="text-orange-500">⚠️</span> Vandalism</td>
                  <td class="py-4 pr-6">Marcus J.</td>
                  <td class="py-4 pr-6">2 mins ago</td>
                  <td class="py-4 pr-6"><span class="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">Pending</span></td>
                  <td class="py-4 pr-6 text-slate-500">—</td>
                </tr>
                <tr>
                  <td class="py-4 pr-6 font-semibold text-slate-900">#KP-8819</td>
                  <td class="py-4 pr-6 flex items-center gap-2 text-slate-700"><span class="text-slate-500">👁️</span> Suspicious Vehicle</td>
                  <td class="py-4 pr-6">Sarah W.</td>
                  <td class="py-4 pr-6">14 mins ago</td>
                  <td class="py-4 pr-6"><span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Verified</span></td>
                  <td class="py-4 pr-6 text-slate-500">—</td>
                </tr>
                <tr class="bg-slate-50">
                  <td class="py-4 pr-6 font-semibold text-slate-900">#KP-8815</td>
                  <td class="py-4 pr-6 flex items-center gap-2 text-slate-700"><span class="text-slate-500">⚡</span> Power Outage</td>
                  <td class="py-4 pr-6">Automatic Sensor</td>
                  <td class="py-4 pr-6">42 mins ago</td>
                  <td class="py-4 pr-6"><span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Rejected</span></td>
                  <td class="py-4 pr-6 text-slate-500">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <button id="btn-sos" type="button" class="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-red-600 px-5 py-3 text-white shadow-lg shadow-red-600/30 font-extrabold hover:bg-red-700 transition active:scale-95">
      <span class="text-xl">🆘</span>
      <span>SOS</span>
    </button>
  `;
}
