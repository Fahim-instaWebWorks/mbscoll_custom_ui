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
import { data, newData } from "../data/data";

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
  const [myEvents, setEvents] = useState(newData);
  const [myResources, setResources] = useState(resources);
  const [participants, setParticipants] = useState(
    [...new Set(newData.map((item) => item.Assigned_To))].map(
      (name, index) => ({
        [index + 1]: true,
        Assigned_To: name,
      })
    )
  );
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

  // const filter = useCallback(
  //   (ev) => {
  //     console.log(+ev.target.value);
  //     console.log(ev.target.checked);
  //     participants[+ev.target.value] = ev.target.checked;
  //     // setParticipants({ ...participants });
  //     // setResources(resources.filter((r) => participants[r.id]));
  //   },
  //   [participants, resources]
  // );

  const filter = useCallback(
    (ev) => {
      const index = +ev.target.value - 1;
      const updatedParticipants = participants.map((item, idx) =>
        idx === index ? { ...item, [index + 1]: ev.target.checked } : item
      );
      setParticipants(updatedParticipants);

      // const activeParticipants = updatedParticipants
      //   .filter((item) => item[index + 1])
      //   .map((item) => item.Assigned_To);

      // setEvents(myEvents.filter((r) => activeParticipants.includes(r.Assigned_To)));
      const filteredResources = myEvents.filter((resource) => {
        return updatedParticipants.some(
          (participant) => participant.Assigned_To === resource.Assigned_To && participant[index + 1]
        );
      });
      setEvents(filteredResources)
    },
    [participants]
  );
  // console.log(participants)
  // console.log({myEvents})

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

  // console.log(myEvents);
  // console.log({ participants });
  console.log({myEvents})
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
            {participants?.map((item, index) => {
              const key = Object.keys(item).find(k => k !== "Assigned_To");
              return (
                <Checkbox
                  key={index}
                  checked={item[key]}
                  onChange={filter}
                  value={key}
                  label={item.Assigned_To}
                />
              );
            })}
            {/* <Checkbox
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
            /> */}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default TaskScheduler;
