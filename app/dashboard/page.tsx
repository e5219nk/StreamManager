'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type MonthlyTotal = {
  month: string;
  totalCoins: number;
};

type DailyTotal = {
  day: string;
  totalCoins: number;
};

type ListenerRankingEntry = {
  Name: string;
  totalCoins: number;
};

type ListenerRankingData = {
  [month: string]: ListenerRankingEntry[];
};

const Dashboard = () => {
  const [monthlyTotals, setMonthlyTotals] = useState<MonthlyTotal[]>([]);
  const [listenerRanking, setListenerRanking] = useState<ListenerRankingData>({});
  const [dailyTotals, setDailyTotals] = useState<DailyTotal[]>([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalsRes = await fetch('/api/monthly-totals');
        const totalsData: MonthlyTotal[] = await totalsRes.json();
        setMonthlyTotals(totalsData);

        if (totalsData.length > 0) {
          const latestMonth = totalsData[0].month;
          setSelectedMonth(latestMonth);
          fetchListenerRanking(latestMonth);
        }

        const dailyRes = await fetch('/api/daily-totals');
        const dailyData: DailyTotal[] = await dailyRes.json();
        setDailyTotals(dailyData.reverse());
      } catch (error) {
        console.error('データ取得エラー:', error);
      }
    };

    fetchData();
  }, []);

  const fetchListenerRanking = async (month: string) => {
    try {
      const rankingRes = await fetch(`/api/listener-ranking?month=${month}`);
      const rankingData: ListenerRankingData = await rankingRes.json();
      setListenerRanking((prev) => ({ ...prev, [month]: rankingData[month] || [] }));
    } catch (error) {
      console.error('リスナーランキング取得エラー:', error);
    }
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = event.target.value;
    setSelectedMonth(newMonth);
    fetchListenerRanking(newMonth);
  };

  const selectedRanking = listenerRanking[selectedMonth] || [];

  const chartData = {
    labels: monthlyTotals.map((entry) => entry.month).reverse(),
    datasets: [
      {
        label: '投げ銭コイン数',
        data: monthlyTotals.map((entry) => entry.totalCoins).reverse(),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        borderWidth: 5,
      },
    ],
  };

  const filteredDailyTotals = dailyTotals.filter((entry) => {
    const entryDate = new Date(entry.day);
    const entryMonth = `${entryDate.getFullYear()}-${String(entryDate.getMonth() + 1).padStart(2, '0')}`;
    return entryMonth === selectedMonth;
  });

  const maxEntry = filteredDailyTotals.reduce<DailyTotal>(
    (max, entry) => (entry.totalCoins > max.totalCoins ? entry : max),
    { totalCoins: 0, day: '' }
  );
  const maxDateStr = maxEntry.day
    ? new Date(maxEntry.day).toLocaleDateString('ja-JP')
    : '';

  const dailyChartData = {
    labels: filteredDailyTotals.map((entry) =>
      new Date(entry.day).toLocaleDateString('ja-JP')
    ),
    datasets: [
      {
        label: '日別投げ銭コイン数',
        data: filteredDailyTotals.map((entry) => entry.totalCoins),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
        borderWidth: 3,
      },
    ],
  };

  const dailyChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: { parsed: { y: number } }) {
            return `投げ銭: ${context.parsed.y.toLocaleString()} コイン`;
          },
        },
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `日別投げ銭推移 (${selectedMonth})`,
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'コイン数',
        },
        ticks: {
          callback: (value: number) => value.toLocaleString(),
        },
      },
      x: {
        title: {
          display: true,
          text: '日付',
        },
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {/* 月ごとの総投げ銭 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold">月ごとの総投げ銭</h2>
        <table className="min-w-full table-auto mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">月</th>
              <th className="border px-4 py-2">総投げ銭コイン数</th>
            </tr>
          </thead>
          <tbody>
            {monthlyTotals
              .sort((a, b) => a.month.localeCompare(b.month))
              .map((entry, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{entry.month}</td>
                  <td className="border px-4 py-2 text-right">{entry.totalCoins}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* 月選択 */}
      <div className="mb-4">
        <label className="font-semibold">月を選択: </label>
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="border p-2 ml-2"
        >
          {monthlyTotals.map((entry) => (
            <option key={entry.month} value={entry.month}>
              {entry.month}
            </option>
          ))}
        </select>
      </div>

      {/* 月別リスナーランキング */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold">リスナー別投げ銭ランキング ({selectedMonth})</h2>
        {selectedRanking.length > 0 ? (
          <table className="min-w-full table-auto mt-4">
            <thead className="bg-purple-500 text-white">
              <tr>
                <th className="border border-gray-400 px-4 py-2">順位</th>
                <th className="border border-gray-400 px-4 py-2">リスナー名</th>
                <th className="border border-gray-400 px-4 py-2">投げ銭コイン数</th>
              </tr>
            </thead>
            <tbody>
              {selectedRanking.map((entry, index) => {
                let rowClass = index % 2 === 0 ? 'bg-blue-100' : 'bg-white';
                if (index === 0) rowClass = 'bg-yellow-200';
                if (index === 1) rowClass = 'bg-gray-300';
                if (index === 2) rowClass = 'bg-amber-200';

                return (
                  <tr key={index} className={`${rowClass} text-black`}>
                    <td className="border border-gray-400 px-4 py-2 text-lg text-center">{index + 1}</td>
                    <td className="border border-gray-400 px-4 py-2 text-lg">
                      {index === 0 ? `🥇 ${entry.Name} 🥇` :
                        index === 1 ? `🥈 ${entry.Name} 🥈` :
                          index === 2 ? `🥉 ${entry.Name} 🥉` :
                            entry.Name}
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-lg text-right">{entry.totalCoins}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="mt-2 text-gray-500">データがありません</p>
        )}
      </div>

      {/* 日別投げ銭推移グラフ */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold">日別投げ銭推移</h2>

        {maxEntry.day && (
          <p className="mt-2 text-green-700 font-medium">
            📈 最も投げられた日: <span className="font-bold">{maxDateStr}</span>（<span className="text-lg">{maxEntry.totalCoins.toLocaleString()}</span> コイン）
          </p>
        )}

        <div className="mt-4">
          <Line data={dailyChartData} options={dailyChartOptions} />
        </div>
      </div>

      {/* 月別投げ銭推移グラフ */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold">月ごとの投げ銭推移</h2>
        <div className="mt-4">
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
