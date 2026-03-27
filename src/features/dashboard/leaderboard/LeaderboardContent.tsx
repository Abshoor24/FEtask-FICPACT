"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Award, Info, TrendingUp, Loader2, Search } from 'lucide-react';
import { useWeeklyLeaderboard, useMonthlyLeaderboard, useLeaderboardAllTime } from '@/data/hooks/useLeaderboard';
import { useGetProfile } from '@/data/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const LeaderboardContent = () => {
    const [filter, setFilter] = useState<'weekly' | 'monthly' | 'all-time'>('weekly');
    const [searchQuery, setSearchQuery] = useState('');
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    useEffect(() => {
        setMounted(true);
    }, []);

    const weeklyQuery = useWeeklyLeaderboard();
    const monthlyQuery = useMonthlyLeaderboard();
    const allTimeQuery = useLeaderboardAllTime();
    const profileQuery = useGetProfile();

    const getActiveQuery = () => {
        switch (filter) {
            case 'weekly': return weeklyQuery;
            case 'monthly': return monthlyQuery;
            case 'all-time': return allTimeQuery;
            default: return weeklyQuery;
        }
    };

    const activeQuery = getActiveQuery();
    const fullLeaderboardData = activeQuery.data?.data || [];
    const leaderboardData = useMemo(() => {
        const keyword = searchQuery.trim().toLowerCase();

        if (!keyword) return fullLeaderboardData;

        return fullLeaderboardData.filter((item) =>
            item.profile.name?.toLowerCase().includes(keyword) ||
            item.profile.email?.toLowerCase().includes(keyword)
        );
    }, [fullLeaderboardData, searchQuery]);
    const isLoading = activeQuery.isLoading;
    const currentUser = profileQuery.data?.data;

    // Separate top 3 and others
    const podiumRes = leaderboardData.slice(0, 3);
    const tableData = leaderboardData.slice(3);

    // Get current user's rank from the full list if available
    const myRankData = fullLeaderboardData.find(item => item.profile.email === currentUser?.email);

    if (!mounted) {
        return (
            <div className="max-w-5xl mx-auto p-4 md:p-8">
                <header className="mb-8 h-20 bg-slate-50 dark:bg-slate-800 animate-pulse rounded-2xl" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="h-64 bg-slate-50 dark:bg-slate-800 animate-pulse rounded-2xl" />
                    <div className="h-64 bg-slate-50 dark:bg-slate-800 animate-pulse rounded-2xl" />
                    <div className="h-64 bg-slate-50 dark:bg-slate-800 animate-pulse rounded-2xl" />
                </div>
            </div>
        );
    }

    const renderPodium = () => {
        if (isLoading) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-pulse">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 h-64 shadow-sm" />
                    ))}
                </div>
            );
        }

        if (podiumRes.length === 0) return null;

        // Podium order: 2, 1, 3 for visual appeal
        const podiumOrder = [
            podiumRes[1] || null, // Rank 2
            podiumRes[0] || null, // Rank 1
            podiumRes[2] || null  // Rank 3
        ];

        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {podiumOrder.map((user, index) => {
                    if (!user) return <div key={index} className="hidden md:block" />;

                    const isFirst = user.rank === 1;
                    const isSecond = user.rank === 2;
                    const isThird = user.rank === 3;

                    return (
                        <div
                            key={user.id}
                            className={`
                                relative flex flex-col items-center text-center overflow-hidden transition-all duration-300 hover:scale-[1.02]
                                ${isFirst ? 'order-1 md:order-2 bg-white dark:bg-slate-900 p-8 rounded-2xl border-2 border-violet-600 shadow-xl shadow-violet-600/10 transform md:-translate-y-4' :
                                    isSecond ? 'order-2 md:order-1 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm' :
                                        'order-3 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm'}
                            `}
                        >
                            {/* Accent line */}
                            <div className={`absolute top-0 left-0 w-full h-1.5 ${isFirst ? 'bg-violet-600' : isSecond ? 'bg-slate-300' : 'bg-amber-600/40'}`} />

                            {isFirst && (
                                <div className="absolute -top-4 -right-4 bg-violet-600/10 p-8 rounded-full">
                                    <Award className="text-violet-600 w-12 h-12 opacity-20" />
                                </div>
                            )}

                            <div className="relative mb-4">
                                <div className={`
                                    rounded-full overflow-hidden bg-slate-100 flex items-center justify-center border-4
                                    ${isFirst ? 'w-24 h-24 border-violet-600' : 'w-20 h-20 border-slate-200'}
                                `}>
                                    {user.profile.avatar ? (
                                        <Image
                                            className="w-full h-full object-cover" alt={user.profile.name} src={user.profile.avatar}
                                            width={200} height={200} unoptimized
                                        />
                                    ) : (
                                        <span className="text-2xl font-bold text-slate-400 capitalize">{user.profile.name?.charAt(0) || '?'}</span>
                                    )}
                                </div>
                                <div className={`
                                    absolute -bottom-2 -right-2 rounded-full flex items-center justify-center font-black border-2 border-white
                                    ${isFirst ? 'bg-yellow-400 text-yellow-900 w-10 h-10 text-lg' :
                                        isSecond ? 'bg-slate-300 text-slate-700 w-8 h-8 text-sm' :
                                            'bg-amber-600 text-white w-8 h-8 text-sm'}
                                `}>
                                    {user.rank}
                                </div>
                            </div>

                            <h4 className={`font-bold text-slate-900 dark:text-white ${isFirst ? 'text-xl font-extrabold' : ''}`}>
                                {user.profile.name || "Anonymous"}
                                {user.profile.email === currentUser?.email && (
                                    <span className="ml-2 text-[10px] bg-violet-600 text-white px-1.5 py-0.5 rounded-full uppercase font-bold">Anda</span>
                                )}
                            </h4>
                            <p className={`text-sm ${isFirst ? 'text-violet-600' : 'text-slate-500'}`}>Lvl {user.level} Guardian</p>

                            <div className={`
                                mt-4 px-4 py-1.5 rounded-full text-sm font-bold
                                ${isFirst ? 'bg-violet-600 text-white shadow-md' :
                                    isSecond ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300' :
                                        'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'}
                            `}>
                                {user.exp.toLocaleString()} EXP
                            </div>

                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8">
            {/* Header */}
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="w-full">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Papan Peringkat Guardian</h2>
                    <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-2">Kompetisi persahabatan antar pelajar TaskQuest. Terus selesaikan tugasmu!</p>
                </div>
                {isLoading && (
                    <div className="flex items-center gap-2 text-violet-600 font-medium">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Memuat...</span>
                    </div>
                )}
            </header>

            {/* Top 3 Podium Cards */}
            {renderPodium()}

            {/* Filters */}
            <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full md:w-auto overflow-x-auto no-scrollbar">
                        {(['weekly', 'monthly', 'all-time'] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => setFilter(t)}
                                className={`
                                    px-3 md:px-6 py-2 text-xs md:text-sm font-bold flex-1 md:flex-none whitespace-nowrap transition-all duration-200
                                    ${filter === t
                                        ? 'bg-white dark:bg-slate-700 shadow-sm rounded-lg text-violet-600'
                                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}
                                `}
                            >
                                {t === 'weekly' ? 'Mingguan' : t === 'monthly' ? 'Bulanan' : 'Sepanjang Waktu'}
                            </button>
                        ))}
                    </div>

                    <div className="flex w-full sm:w-72 sm:flex-1 shrink-0 items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                        <Search className="w-4 h-4 text-slate-400 shrink-0" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari Guardian..."
                            className="w-full min-w-0 bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 outline-none"
                        />
                    </div>
                </div>
                {!isLoading && (
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Info className="w-4 h-4" />
                        <span>Diperbarui secara real-time</span>
                    </div>
                )}
            </div>

            {/* Ranking Table */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                <th className="px-3 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">Peringkat</th>
                                <th className="px-3 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">Guardian</th>
                                <th className="px-3 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Level</th>
                                <th className="px-3 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider text-right">EXP</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {isLoading ? (
                                [1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i}>
                                        <td colSpan={4} className="px-3 md:px-6 py-3 md:py-4">
                                            <div className="h-8 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg" />
                                        </td>
                                    </tr>
                                ))
                            ) : leaderboardData.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-3 md:px-6 py-8 md:py-12 text-center text-sm text-slate-400 italic">
                                        Belum ada data peringkat untuk periode ini
                                    </td>
                                </tr>
                            ) : (
                                leaderboardData.map((user) => (
                                    <tr
                                        key={user.id}
                                        className={`
                                            transition-colors
                                            ${user.profile.email === currentUser?.email
                                                ? 'bg-violet-50 dark:bg-violet-900/10 border-y-2 border-violet-200 dark:border-violet-800/30'
                                                : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/50'}
                                        `}
                                    >
                                        <td className={`px-3 md:px-6 py-3 md:py-4 font-bold ${user.profile.email === currentUser?.email ? 'text-violet-600 dark:text-violet-400 text-lg md:text-xl font-black' : 'text-slate-700 dark:text-slate-300 text-base md:text-lg'}`}>
                                            #{user.rank}
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 min-w-0">
                                            <div className="flex items-center gap-2 md:gap-3">
                                                <div className={`
                                                    shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden flex items-center justify-center
                                                    ${user.profile.email === currentUser?.email ? 'bg-violet-600 border-2 border-violet-600' : 'bg-slate-200'}
                                                `}>
                                                    {user.profile.avatar ? (
                                                        <Image className="w-full h-full object-cover" alt={user.profile.name} src={user.profile.avatar} unoptimized width={200} height={200} />
                                                    ) : (
                                                        <span className={`font-bold ${user.profile.email === currentUser?.email ? 'text-white text-xs' : 'text-slate-400'}`}>
                                                            {user.profile.email === currentUser?.email ? 'ME' : user.profile.name?.charAt(0) || '?'}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <span className={`block truncate leading-tight font-semibold text-sm md:text-base ${user.profile.email === currentUser?.email ? 'font-black text-slate-900 dark:text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                                                        {user.profile.name || "Anonymous"}
                                                    </span>
                                                    {user.profile.email === currentUser?.email && (
                                                        <span className="text-[9px] md:text-[10px] bg-violet-600 text-white px-1.5 md:px-2 py-0.5 rounded-full uppercase font-bold tracking-wider leading-none mt-1 inline-block">Anda</span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 text-center">
                                            <span className={`px-2 py-0.5 md:px-3 md:py-1 rounded-md md:rounded-lg text-xs md:text-sm font-medium ${user.profile.email === currentUser?.email ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                                                Lvl {user.level}
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 text-right">
                                            <span className={`block font-bold text-xs md:text-base whitespace-nowrap ${user.profile.email === currentUser?.email ? 'text-violet-600 dark:text-violet-400 font-black' : 'text-slate-900 dark:text-white'}`}>
                                                {user.exp.toLocaleString()} EXP
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Motivation Footer */}
            {myRankData && (
                <div className="mt-8 p-6 bg-violet-50 dark:bg-violet-900/10 rounded-2xl flex flex-col md:flex-row items-center justify-between border border-violet-200 dark:border-violet-800/30 gap-6 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="size-12 rounded-full bg-violet-600 flex items-center justify-center text-white shrink-0">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white">Peringkat Kamu: #{myRankData.rank}</p>
                            <p className="text-sm text-slate-500">
                                {myRankData.rank > 1
                                    ? `Butuh ${((fullLeaderboardData[fullLeaderboardData.indexOf(myRankData) - 1]?.exp || 0) - myRankData.exp + 1).toLocaleString()} EXP lagi untuk naik peringkat!`
                                    : "Selamat! Kamu berada di posisi puncak!"}
                            </p>
                        </div>
                    </div>
                    <button onClick={
                        () => {
                            router.push("/dashboard")
                        }
                    } className="w-full md:w-auto px-6 py-2.5 bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-700 font-bold rounded-xl hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 dark:hover:text-white transition-all shadow-sm">
                        Kumpulkan EXP
                    </button>
                </div>
            )}
        </div>
    );
};

export default LeaderboardContent;
