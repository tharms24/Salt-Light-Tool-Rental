"use client";

import { useEffect, useMemo, useState } from "react";

export interface DateRangeValue {
  start: string | null;
  end: string | null;
}

interface CalendarProps {
  toolId: number;
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
  onError?: (message: string | null) => void;
}

const DOW = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function toIso(year: number, month: number, day: number): string {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function todayIso(): string {
  const d = new Date();
  return toIso(d.getFullYear(), d.getMonth(), d.getDate());
}

export default function Calendar({ toolId, value, onChange, onError }: CalendarProps) {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth()); // 0-indexed
  const [unavailable, setUnavailable] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const today = todayIso();

  useEffect(() => {
    let ignore = false;
    const monthStart = toIso(viewYear, viewMonth, 1);
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const monthEnd = toIso(viewYear, viewMonth, daysInMonth);

    fetch(`/api/availability?toolId=${toolId}&start=${monthStart}&end=${monthEnd}`)
      .then((res) => res.json())
      .then((data: { unavailableDates?: string[] }) => {
        if (ignore) return;
        // Merge rather than replace, so a range validated while paging
        // across a month boundary still has the earlier month's booked
        // dates to check against. The server re-checks the full range
        // independently at confirmation time regardless.
        setUnavailable((prev) => new Set([...prev, ...(data.unavailableDates ?? [])]));
        setLoading(false);
      })
      .catch(() => {
        if (ignore) return;
        onError?.("Couldn't load availability. Please try again.");
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toolId, viewYear, viewMonth]);

  const cells = useMemo(() => {
    const firstDow = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const items: { day: number | null; iso: string | null }[] = [];
    for (let i = 0; i < firstDow; i++) items.push({ day: null, iso: null });
    for (let d = 1; d <= daysInMonth; d++) items.push({ day: d, iso: toIso(viewYear, viewMonth, d) });
    return items;
  }, [viewYear, viewMonth]);

  function goPrevMonth() {
    onError?.(null);
    setLoading(true);
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }

  function goNextMonth() {
    onError?.(null);
    setLoading(true);
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }

  function isPast(iso: string): boolean {
    return iso < today;
  }

  function hasUnavailableBetween(a: string, b: string): boolean {
    const [start, end] = a <= b ? [a, b] : [b, a];
    for (const iso of unavailable) {
      if (iso >= start && iso <= end) return true;
    }
    return false;
  }

  function handleDayClick(iso: string) {
    onError?.(null);
    const { start, end } = value;

    if (!start || (start && end)) {
      onChange({ start: iso, end: null });
      return;
    }

    // start is set, end is not: this click sets the end (or restarts the selection).
    if (iso < start) {
      onChange({ start: iso, end: null });
      return;
    }

    if (hasUnavailableBetween(start, iso)) {
      onError?.("That range includes a date that's already booked. Please choose different dates.");
      return;
    }

    onChange({ start, end: iso });
  }

  const prevDisabled = viewYear === now.getFullYear() && viewMonth === now.getMonth();

  return (
    <div className="calendar">
      <div className="calendar-nav">
        <button type="button" onClick={goPrevMonth} disabled={prevDisabled} aria-label="Previous month">
          &#8249;
        </button>
        <strong>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </strong>
        <button type="button" onClick={goNextMonth} aria-label="Next month">
          &#8250;
        </button>
      </div>
      <div className="calendar-grid" aria-busy={loading}>
        {DOW.map((d, i) => (
          <div className="calendar-dow" key={i}>
            {d}
          </div>
        ))}
        {cells.map((cell, i) => {
          if (!cell.iso) return <span className="calendar-day is-empty" key={i} />;

          const iso = cell.iso;
          const past = isPast(iso);
          const booked = unavailable.has(iso);
          const disabled = past || booked;
          const isStart = value.start === iso;
          const isEnd = value.end === iso;
          const inRange = !!(value.start && value.end && iso > value.start && iso < value.end);

          const classes = ["calendar-day"];
          if (past) classes.push("is-past");
          if (isStart || isEnd) classes.push("is-selected");
          if (inRange) classes.push("is-in-range");

          return (
            <button
              type="button"
              key={i}
              className={classes.join(" ")}
              disabled={disabled}
              onClick={() => handleDayClick(iso)}
              title={booked && !past ? "Already booked" : undefined}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
