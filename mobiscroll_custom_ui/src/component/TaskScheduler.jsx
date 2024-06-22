import {
  CalendarNav,
  CalendarNext,
  CalendarPrev,
  CalendarToday,
  Checkbox,
  Dropdown,
  Eventcalendar,
  Input,
  Page,
  Popup,
  Segmented,
  SegmentedGroup,
  setOptions,
} from "@mobiscroll/react";
import { useCallback, useMemo, useState } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

import { newData } from "../data/data";

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
  const [tempEvent, setTempEvent] = useState(null);
  const [title, setTitle] = useState("New event");
  const [isOpen, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [isNewEvent, setIsNewEvent] = useState(false);
  const [attendent,setAttendent] = useState('')
 const [newEvent,setNewEvent] = useState({
  color: "",
  end: "",
  start: "",
  title: "",
  Assigned_To: ""
})

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
      default:
        myView = {
          calendar: { labels: true },
        };
        break;
    }

    setView(event.target.value);
    setMyView(myView);
  }, []);

  const filter = useCallback(
    (ev) => {
      const index = +ev.target.value - 1;
      const updatedParticipants = participants.map((item, idx) =>
        idx === index ? { ...item, [index + 1]: ev.target.checked } : item
      );
      setParticipants(updatedParticipants);

      const filteredEvents = newData.filter((event) => {
        return updatedParticipants.some(
          (participant) =>
            participant.Assigned_To === event.Assigned_To &&
            participant[
              Object.keys(participant).find((key) => key !== "Assigned_To")
            ]
        );
      });

      setEvents(filteredEvents);
    },
    [participants, newData]
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

  ///show popup
  const showPopup = useCallback((args) => {
    const event = args.event;
    // const resources = Array.isArray(event.resource)
    //   ? event.resource
    //   : [event.resource];
    // store temporary event
    setTempEvent(args.event);
    // fill popup with the current event data
    setTitle(event.title);
    // setParticipants(resources);
    // set anchor for the popup
    setAnchor(args.target ? args.target : args.domEvent.target);
    setOpen(true);
  }, []);

  ///create popup
  const handleEventCreated = useCallback(
    (args) => {
      console.log(args);
      setIsNewEvent(true);
      showPopup(args);
      setNewEvent(prevEvent => ({
        ...prevEvent,
        start: args.event.start,
        end: args.event.end
      }))
    },
    [showPopup]
  );

  const popupClose = useCallback(() => {
    if (isNewEvent) {
      // setEvents(myEvents.filter((item) => item.id !== tempEvent.id));
    }
    setOpen(false);
  }, [isNewEvent, myEvents, tempEvent]);

  const popupButtons = useMemo(
    () => [
      "cancel",
      {
        text: "OK",
        keyCode: "enter",
        handler: () => {
          // tempEvent.resource = participants;
          tempEvent.title = title;

          newData.push(newEvent)
          
          if (isNewEvent) {
            setEvents([...myEvents, tempEvent]);
          } else {
            setEvents([...myEvents]);
          }

          // update event with the new properties on OK button click
          setIsNewEvent(false);

          setOpen(false);
        },
        cssClass: "mbsc-popup-button-primary",
      },
    ],
    [isNewEvent, myEvents, participants, tempEvent, title]
  );

  const titleChange = useCallback((ev) => {
    setTitle(ev.target.value);
    setNewEvent(prevEvent => ({
      ...prevEvent,
      title: ev.target.value
    }))
  }, []);

  const eventParticipants = useCallback((e) => {
    console.log(e.target.value);
    setAttendent(e.target.value)
    setNewEvent(prevEvent => ({
      ...prevEvent,
      Assigned_To: e.target.value
    }))
  });

  console.log(newData)
  // console.log(newEvent)

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
              onEventCreated={handleEventCreated}
            />
          </div>
          <Popup
            display="anchored"
            contentPadding={false}
            touchUi={false}
            width={350}
            buttons={popupButtons}
            onClose={popupClose}
            isOpen={isOpen}
            anchor={anchor}
          >
            <div className="mbsc-form-group">
              <Input
                label="Title"
                value={title}
                onChange={titleChange}
                inputStyle="box"
                labelStyle="stacked"
              />
              {/* 
              <Input
                label="Meeting attended by"
                value={title}
                onChange={titleChange}
                inputStyle="box"
                labelStyle="stacked"
              /> */}
                <Dropdown inputStyle="box" labelStyle="stacked" label="Attended By"  onChange={eventParticipants}>
                  {participants?.map((item, index) => {
                    const key = Object.keys(item).find(
                      (k) => k !== "Assigned_To"
                    );
                    return (
                      <option value={item.Assigned_To} key={index}>
                        {item.Assigned_To}
                      </option>
                    );
                  })}
                  {/* <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option> */}
                </Dropdown>
          
              {/* <div className="mbsc-padding">
                <label className="mbsc-txt-muted">
                  Select event participants
                </label>
              </div>
              <SegmentedGroup
                select="multiple"
                // value={participants}
                onChange={eventParticipants}
              >
                {participants?.map((item, index) => {
                  const key = Object.keys(item).find(
                    (k) => k !== "Assigned_To"
                  );
                  return (
                    <Segmented key={index} value={item.Assigned_To}>
                      {item.Assigned_To}
                    </Segmented>
                  );
                })}
                <Segmented value={2}>tazwer</Segmented>
                <Segmented value={3}>shezan</Segmented>
                <Segmented value={3}>rahul</Segmented>
              </SegmentedGroup> */}
            </div>
          </Popup>
          <div className="mbsc-col-sm-3">
            <div className="mbsc-form-group-title">Show available tasks</div>
            {participants?.map((item, index) => {
              const key = Object.keys(item).find((k) => k !== "Assigned_To");
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
          </div>
        </div>
      </div>
    </Page>
  );
};

export default TaskScheduler;
