import React from 'react';

const opening = [
  { day: 'Sunday', time: 'closed' },
  { day: 'Monday', time: 'closed' },
  { day: 'Tuesday', time: '10am to 3pm' },
  { day: 'Wednesday', time: '10am to 3pm - 7pm to 10pm' },
  { day: 'Thursday', time: '10am to 3pm' },
  { day: 'Friday', time: '10am to 3pm' },
  { day: 'Saturday', time: '10am to 3pm - 7pm to 10pm' },
];

function getCurrentDay() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const now = new Date();
  return days[now.getDay()];
}

export default function OpeningHoursPage() {
  const currentDay = getCurrentDay();
  return (
    <section className="max-w-xl mx-auto">
      <h1 className="mb-8 font-bold text-center">Horaires d'ouverture</h1>
      <ul className="space-y-3">
        {opening.map(({ day, time }) => (
          <li
            key={day}
            className={
              time === 'closed'
                ? 'text-gray-400 line-through flex justify-between px-4 py-2 rounded'
                : day === currentDay
                ? 'bg-green-100 text-green-900 font-bold flex justify-between px-4 py-2 rounded shadow'
                : 'flex justify-between px-4 py-2 rounded'
            }
          >
            <span>{day}</span>
            <span>{time}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
