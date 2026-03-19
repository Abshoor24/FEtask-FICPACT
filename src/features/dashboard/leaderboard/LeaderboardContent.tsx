import React from 'react';
import { Award, Info, TrendingUp } from 'lucide-react';

const LeaderboardContent = () => {
  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Header */}
      <header className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Papan Peringkat Guardian</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Kompetisi persahabatan antar pelajar TaskQuest. Terus selesaikan tugasmu!</p>
      </header>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Rank 2 */}
        <div className="order-2 md:order-1 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-300"></div>
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full border-4 border-slate-200 overflow-hidden bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-full h-full object-cover" alt="Siti Aminah" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAK916XlqhQ5TcmRDL1xdlawWi71oh9DW-YlF19aCmRtHOZvlMAJIz8pozZdqx4k9wtofOEh22PzKGtDlx4zR1dpz5spTjmVlRbnv9StTpwlp1qywIRS4-T_3-YJoIHq2sJ7ydd-sG9okEEmNsYvB9uJfglakq3pkqSD2NXI_P2CWlbvaxQfFhN7tOabM34Lbp0SEm2d7K23_qRkvq1-SzQ9Z7NgAoRXqudluJcaNFiVIW4jXeTh5fkNm1SISVRaUcfA5kdLxwJb0"/>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-slate-300 text-slate-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">2</div>
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white">Siti Aminah</h4>
          <p className="text-sm text-slate-500">Lvl 42 Guardian</p>
          <div className="mt-4 px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-bold text-slate-700 dark:text-slate-300">11.200 EXP</div>
        </div>

        {/* Rank 1 */}
        <div className="order-1 md:order-2 bg-white dark:bg-slate-900 p-8 rounded-2xl border-2 border-violet-600 flex flex-col items-center text-center relative overflow-hidden shadow-xl shadow-violet-600/10 transform md:-translate-y-4">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-violet-600"></div>
          <div className="absolute -top-4 -right-4 bg-violet-600/10 p-8 rounded-full">
            <Award className="text-violet-600 w-12 h-12 opacity-20" />
          </div>
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full border-4 border-violet-600 overflow-hidden bg-violet-600/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-full h-full object-cover" alt="Budi Santoso" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVkRGqODa9MjS-gVICk_utOdk6gj_6qzFCpMDO4t1E8fVir-Xl1NVzjPus1mpvI2ltotYFsNGJnSe3xDVVDq8cepUZwcOEaZJvy_gjAs1AMzw_XhW8mWVfA043zI0ZgPtF3XCYD6pGRhbx1lqltzMLGd_vgM6pmKqL4-pAdTWjNIMDkQU0d-JDwkXmyXd5yf3yHl1OVSHmsFiTSLE5ciFBw5slMDOOrc-ePP3lDBF4fJXdw__3QdhgwOt0j9_LXZ6xCyTuQjUrSUQ"/>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 w-10 h-10 rounded-full flex items-center justify-center font-black text-lg border-4 border-white">1</div>
          </div>
          <h4 className="font-extrabold text-xl text-slate-900 dark:text-white">Budi Santoso</h4>
          <p className="text-sm font-medium text-violet-600">Lvl 45 Grandmaster</p>
          <div className="mt-4 px-6 py-2 bg-violet-600 text-white rounded-full text-base font-black shadow-md">12.500 EXP</div>
        </div>

        {/* Rank 3 */}
        <div className="order-3 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 left-0 w-full h-1 bg-amber-600/40"></div>
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full border-4 border-amber-600/20 overflow-hidden bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-full h-full object-cover" alt="Andi Wijaya" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSMDsssZZVRb-PpSOzXOv6aCM6o9fxr_ea92U4eVwNnaQCimdB4uPjAqrFYTuiKnVoYWrX8A487HtEtUJ1G137_twcN2QqHD9oGqZbzGVklYfyoNcIkLizr3Z0ttIeDZOGue9ii8-XznzoEVBEJ39pMiCkAeipCJ8y3rMb6pcl0JbVNRYqD21LTPBQc9BFwclXhFMFgky_ItSB0wYKoEA-W9kFf58o6gv0oMY79m3WfXs_rqDpT6nlzXK8V5qs7h_vxJM6_V_AeCI"/>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">3</div>
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white">Andi Wijaya</h4>
          <p className="text-sm text-slate-500">Lvl 40 Guardian</p>
          <div className="mt-4 px-4 py-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-full text-sm font-bold text-amber-700 dark:text-amber-400">10.850 EXP</div>
        </div>

      </div>

      {/* Filters */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button className="px-6 py-2 text-sm font-bold bg-white dark:bg-slate-700 shadow-sm rounded-lg text-violet-600">Mingguan</button>
          <button className="px-6 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">Bulanan</button>
          <button className="px-6 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">Sepanjang Waktu</button>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <Info className="w-4 h-4" />
          <span>Diperbarui 5 menit yang lalu</span>
        </div>
      </div>

      {/* Ranking Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Peringkat</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Guardian</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Level</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Total EXP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {/* User Item */}
            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
              <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300 text-lg">#4</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover" alt="Rina Putri" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDalh57MDBh06DIeGkAehC5SKvP8BXD7mRzZEyV9A29Z1YA06l1E-inrDgfEwjY2JwkDwKPSqvEk5wh7o6-o7L10VSecrn_YA95dMtUp8otUOOURXG1qgSMzQKqxLOT4nrHQlLlptm9ncF1VEHI7qSJrytBO9GC2EIODXM4e9WHgSf8fh8EI_DHErDtfu9T_D0mjNPaWe7Bkra8gcz-DhHlR6FcZtmwKyU1WVHnuydMSvfpiCYOPXkPp0xwchnxCax3eWkMw6-QSQg"/>
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Rina Putri</span>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300">Lvl 38</span>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="font-bold text-slate-900 dark:text-white">9.400 EXP</span>
              </td>
            </tr>
            {/* User Item */}
            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
              <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300 text-lg">#5</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover" alt="Dewi Lestari" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnJD5PJH0YpekWAInDEN1F5QpOEUVPGcrBFGtTcahLxc39A64Sa_6_QTHHucOcXMOPiR3gL2Ef1KmBc_a26SWyr7lYtQAX0QxjpCrxdgHMkJSeKBQMopzwiIZry3Y0FoJnGiZhn73Rq3brEf0zodXufPoAu0OcXqF8NvMvFyLAZ-PSdD8o54jzQ8NEqqCkJswXtuPdLpbqKDWTfLZkYMfjCgUr7jqiK1ZVjMrL1Jg5KxIgg3e0Mxvj8K7Webf0oju9DITpqKTDX8g"/>
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Dewi Lestari</span>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300">Lvl 35</span>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="font-bold text-slate-900 dark:text-white">8.900 EXP</span>
              </td>
            </tr>
            {/* My Rank Sticky Style */}
            <tr className="bg-violet-50 dark:bg-violet-900/10 border-y-2 border-violet-200 dark:border-violet-800/30">
              <td className="px-6 py-4 font-black text-violet-600 dark:text-violet-400 text-xl">#12</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-600 overflow-hidden border-2 border-violet-600">
                    <div className="w-full h-full flex items-center justify-center bg-violet-600 text-white font-bold text-xs">ME</div>
                  </div>
                  <div>
                    <span className="font-black text-slate-900 dark:text-white block leading-tight">Kevin Aris</span>
                    <span className="text-[10px] bg-violet-600 text-white px-1.5 py-0.5 rounded-full uppercase font-bold tracking-wider leading-none mt-1 inline-block">Anda</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="px-3 py-1 bg-violet-100 dark:bg-violet-900/30 rounded-lg text-sm font-bold text-violet-600 dark:text-violet-400">Lvl 12</span>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="font-black text-violet-600 dark:text-violet-400">4.250 EXP</span>
              </td>
            </tr>
            {/* User Item */}
            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors opacity-75">
              <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300 text-lg">#13</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover" alt="Maya Sari" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCypO-tlggjEQp96X4dI8dKIJrtkAHW5TCol3IC8wvHi-udcOPS7XyMrZEIP5MT-W8Yd5QUSj673nzrJPFVntb4YjmOAiCsONK_i9HEjl6MJ0QI-XbHtPvA6yn9YICSR0XeHphlaGURBxUgGbKbV-jyx2iUDljyuDTIL5OnjsYN7rBxy6xl-uOemZKl-FPC5mqS9PsIKdTk3emHxnCQmeBzi6bSkAGfeSiZOBPf2m6AVNqSH7ctQy4aoxsueEGTYy91YPFdsHh5k54"/>
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Maya Sari</span>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300">Lvl 11</span>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="font-bold text-slate-900 dark:text-white">4.100 EXP</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Motivation Footer */}
      <div className="mt-8 p-6 bg-violet-50 dark:bg-violet-900/10 rounded-2xl flex items-center justify-between border border-violet-200 dark:border-violet-800/30">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-full bg-violet-600 flex items-center justify-center text-white">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white">Naik 3 peringkat hari ini!</p>
            <p className="text-sm text-slate-500">Kumpulkan 150 EXP lagi untuk mencapai peringkat #11</p>
          </div>
        </div>
        <button className="px-6 py-2.5 bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-700 font-bold rounded-xl hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 dark:hover:text-white transition-all shadow-sm">
          Lihat Tantangan
        </button>
      </div>
    </div>
  );
};

export default LeaderboardContent;
