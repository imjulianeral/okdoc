import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import esLocale from '@fullcalendar/core/locales/es'
import dayGridPlugin from '@fullcalendar/daygrid'
import listGridPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/list/main.css'
import '@fullcalendar/timegrid/main.css'

import DateForm from './DateForm'

export default function Calendar() {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState()
  const header = {
    left: 'title',
    right: 'prev,next',
  }
  const footer = {
    center: 'timeGridWeek,listWeek',
  }
  return (
    <div
      style={{
        boxShadow: '0 1px 2px 0 rgba(0,0,0,.1)',
        background: '#fff',
        position: 'relative',
        flexGrow: 1,
        borderTop: '4px solid #1ABC9C',
        marginTop: '2rem',
        padding: '1rem',
      }}
    >
      <FullCalendar
        defaultView="timeGridWeek"
        plugins={[
          dayGridPlugin,
          listGridPlugin,
          timeGridPlugin,
          interactionPlugin,
        ]}
        allDaySlot={false}
        visibleRange
        minTime="08:00:00"
        maxTime="18:00:00"
        slotLabelFormat={[
          {
            hour: '2-digit',
            hour12: true,
          },
        ]}
        locale={esLocale}
        header={header}
        dateClick={args => {
          setDate(args.date)
          setOpen(true)
        }}
        footer={footer}
        height={400}
        weekends={false}
        titleFormat={{ year: 'numeric', month: 'short' }}
        validRange={currentDate => {
          let startDate = new Date(currentDate.valueOf())
          let endDate = new Date(currentDate.valueOf())

          // Adjust the start & end dates, respectively
          startDate.setDate(startDate.getDate()) // One day in the past
          endDate.setDate(endDate.getDate() + 90) // Two days into the future

          return { start: startDate, end: endDate }
        }}
      />
      <DateForm open={open} setOpen={setOpen} date={date} />
    </div>
  )
}
