import {
  CalendarNav,
  CalendarNext,
  CalendarPrev,
  CalendarToday,
  Checkbox,
  Eventcalendar,
  getJson,
  Page,
  Segmented,
  SegmentedGroup,
  setOptions,
} from "@mobiscroll/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { data } from "../data/data";

setOptions({
  theme: "ios",
  themeVariant: "light",
});

const resources = [
  {
    id: 1,
    name: "Ryan",
    color: "#f7c4b4",
  },
  {
    id: 2,
    name: "Kate",
    color: "#c6f1c9",
  },
  {
    id: 3,
    name: "John",
    color: "#e8d0ef",
  },
];

const TaskScheduler = () => {
  const [myEvents, setEvents] = useState(data);
  const [myResources, setResources] = useState(resources);
  const [participants, setParticipants] = useState({
    1: true,
    2: true,
    3: true,
  });
  const [view, setView] = useState("month");
  const [myView, setMyView] = useState({
    calendar: { labels: true },
  });

  // const myView = useMemo(
  //   () => ({
  //     schedule: {
  //       type: "week",
  //       allDay: false,
  //       startDay: 1,
  //       endDay: 5,
  //       startTime: "08:00",
  //       endTime: "17:00",
  //     },
  //   }),
  //   []
  // );

  const changeView = useCallback((event) => {
    let myView;

    switch (event.target.value) {
      case "month":
        myView = {
          schedule: { type: "month" },
        };
        break;
      case "week":
        myView = {
          schedule: {
            type: "week",
            allDay: false,
            startDay: 1,
            endDay: 5,
            startTime: "08:00",
            endTime: "17:00",
          },
        };
        break;
    }

    setView(event.target.value);
    setMyView(myView);
  }, []);

  const filter = useCallback(
    (ev) => {
      participants[+ev.target.value] = ev.target.checked;
      setParticipants({ ...participants });
      setResources(resources.filter((r) => participants[r.id]));
    },
    [participants, resources]
  );

  const customWithNavButtons = useCallback(
    () => (
      <>
        <CalendarNav className="cal-header-nav" />
        <div className="cal-header-picker">
          <SegmentedGroup value={view} onChange={changeView}>
            <Segmented value="month">Month</Segmented>
            <Segmented value="week">Week</Segmented>
          </SegmentedGroup>
        </div>
        <CalendarPrev className="cal-header-prev" />
        <CalendarToday className="cal-header-today" />
        <CalendarNext className="cal-header-next" />
      </>
    ),
    [changeView, view]
  );

  // useEffect(() => {
  //   getJson(
  //     'https://trial.mobiscroll.com/resource-events-shared/',
  //     (events) => {
  //       setEvents(events);
  //     },
  //     'jsonp',
  //   );
  // }, []);

  console.log(myEvents);

  return (
    <Page>
      <div className="mbsc-grid mbsc-no-padding">
        <div className="mbsc-row">
          <div className="mbsc-col-sm-9 external-event-calendar">
            <Eventcalendar
              data={myEvents}
              // resources={myResources}
              view={myView}
              renderHeader={customWithNavButtons}
              clickToCreate={true}
              dragToCreate={true}
              dragToMove={true}
              dragToResize={true}
            />
          </div>
          <div className="mbsc-col-sm-3">
            <div className="mbsc-form-group-title">Show available tasks</div>
            <Checkbox
              checked={participants[1]}
              onChange={filter}
              value="1"
              label="Ryan"
            />
            <Checkbox
              checked={participants[2]}
              onChange={filter}
              value="2"
              label="Kate"
            />
            <Checkbox
              checked={participants[3]}
              onChange={filter}
              value="3"
              label="John"
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default TaskScheduler;
