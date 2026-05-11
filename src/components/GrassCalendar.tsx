"use client";

import type { DailySubmission } from "@/types/submission";

type Props = {
  dailySubmissions: DailySubmission[];
  days?: number;
};

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function colorClass(day?: DailySubmission): string {
  if (!day || day.totalSubmissions === 0) return "bg-slate-200";
  if (day.passedSubmissions === 0) return "bg-red-200";
  if (day.passedSubmissions === 1) return "bg-green-200";
  if (day.passedSubmissions <= 3) return "bg-green-400";
  return "bg-green-700";
}

export function GrassCalendar({ dailySubmissions, days = 98 }: Props) {
  const dailyMap = new Map(dailySubmissions.map((day) => [day.date, day]));
  const today = new Date();
  const rangeStart = addDays(today, -(days - 1));
  const calendarStart = addDays(rangeStart, -rangeStart.getDay());
  const totalCells = Math.ceil((days + rangeStart.getDay()) / 7) * 7;
  const cells = Array.from({ length: totalCells }, (_, index) => {
    const date = addDays(calendarStart, index);
    const key = toDateKey(date);
    const inRange = date >= rangeStart && date <= today;
    return { key, date, day: inRange ? dailyMap.get(key) : undefined, inRange };
  });
  const weeks = Array.from({ length: totalCells / 7 }, (_, weekIndex) => cells.slice(weekIndex * 7, weekIndex * 7 + 7));
  const monthLabels = weeks.map((week, index) => {
    const firstVisibleDay = week.find((cell) => cell.inRange);
    if (!firstVisibleDay) return "";

    const previousWeek = weeks[index - 1];
    const previousVisibleDay = previousWeek?.find((cell) => cell.inRange);
    if (index === 0 || firstVisibleDay.date.getMonth() !== previousVisibleDay?.date.getMonth()) {
      return `${firstVisibleDay.date.getMonth() + 1}월`;
    }

    return "";
  }).map((label, index) => ({ label, left: index * 20 }));

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-ink">잔디 그래프</h3>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>적음</span>
          <span className="h-3 w-3 rounded-sm bg-slate-200" />
          <span className="h-3 w-3 rounded-sm bg-red-200" />
          <span className="h-3 w-3 rounded-sm bg-green-200" />
          <span className="h-3 w-3 rounded-sm bg-green-400" />
          <span className="h-3 w-3 rounded-sm bg-green-700" />
          <span>많음</span>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto pb-2">
        <div className="min-w-max">
          <div className="relative h-6" style={{ width: `${weeks.length * 20}px` }}>
            {monthLabels
              .filter(({ label }) => label)
              .map(({ label, left }) => (
                <span key={`${label}-${left}`} className="absolute top-0 whitespace-nowrap text-xs font-semibold text-slate-500" style={{ left }}>
                  {label}
                </span>
              ))}
          </div>

          <div className="flex gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={`week-${weekIndex}`} className="grid grid-rows-7 gap-1">
                {week.map(({ key, day, inRange }) => {
                  const passedAlgorithms = day?.algorithms.filter((item) => item.passed).map((item) => item.algorithmId).join(", ") || "없음";
                  const title = `${key}\n총 제출: ${day?.totalSubmissions ?? 0}회\n통과: ${day?.passedSubmissions ?? 0}회\n통과 알고리즘: ${passedAlgorithms}`;

                  return <div key={key} title={title} className={`h-4 w-4 rounded-[4px] ${inRange ? colorClass(day) : "bg-transparent"}`} />;
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
