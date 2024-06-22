import { Eventcalendar, Input, Popup, Segmented, SegmentedGroup, setOptions } from '@mobiscroll/react';
import { useCallback, useMemo, useState } from 'react';

setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

function App() {
  const [tempEvent, setTempEvent] = useState(null);
  const [title, setTitle] = useState('New event');
  const [participants, setParticipants] = useState([]);
  const [anchor, setAnchor] = useState(null);
  const [isNewEvent, setIsNewEvent] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const [myEvents, setEvents] = useState([
    {
      start: '2024-06-19T10:00',
      end: '2024-06-19T15:00',
      title: 'Impact Training',
      resource: [2, 3],
      color: '#35bb5a',
    },
    {
      start: '2024-06-20T10:00',
      end: '2024-06-20T15:00',
      title: 'Impact Training',
      resource: [2, 3],
      color: '#35bb5a',
    },
    {
      start: '2024-06-22T08:30',
      end: '2024-06-22T10:00',
      title: 'Quick mtg. with Martin',
      resource: 3,
      color: '#913aa7',
    },
    {
      start: '2024-06-22T12:00',
      end: '2024-06-22T13:00',
      title: 'General orientation',
      resource: [1, 2, 3],
      color: '#a71111',
    },
    {
      start: '2024-06-23T10:00',
      end: '2024-06-23T11:00',
      title: 'Product team mtg.',
      resource: [2, 3],
      color: '#6e7f29',
    },
    {
      start: '2024-06-24T14:00',
      end: '2024-06-24T16:00',
      title: 'Stakeholder mtg.',
      resource: 1,
      color: '#dcd234',
    },
    {
      start: '2024-06-25T10:00',
      end: '2024-06-25T14:00',
      title: 'Innovation mtg.',
      resource: [1, 2],
      color: '#de3d83',
    },
  ]);
  const myView = useMemo(
    () => ({
      schedule: {
        type: 'week',
        allDay: false,
        startDay: 1,
        endDay: 5,
        startTime: '08:00',
        endTime: '17:00',
      },
    }),
    [],
  );

  const myResources = useMemo(
    () => [
      {
        id: 1,
        name: 'Ryan',
        color: '#f7c4b4',
      },
      {
        id: 2,
        name: 'Kate',
        color: '#c6f1c9',
      },
      {
        id: 3,
        name: 'John',
        color: '#e8d0ef',
      },
    ],
    [],
  );

  const showPopup = useCallback((args) => {
    const event = args.event;
    const resources = Array.isArray(event.resource) ? event.resource : [event.resource];

    // store temporary event
    setTempEvent(args.event);

    // fill popup with the current event data
    setTitle(event.title);
    setParticipants(resources);

    // set anchor for the popup
    setAnchor(args.target ? args.target : args.domEvent.target);
    setOpen(true);
  }, []);

  const handleEventCreated = useCallback(
    (args) => {
      setIsNewEvent(true);
      showPopup(args);
    },
    [showPopup],
  );

  const handleEventDoubleClick = useCallback(
    (args) => {
      setIsNewEvent(false);
      showPopup(args);
    },
    [showPopup],
  );

  const handleEventDeleted = useCallback(
    (args) => {
      setEvents(myEvents.filter((item) => item.id !== args.event.id));
    },
    [myEvents],
  );

  const handleExtendDefaultEvent = useCallback(() => ({ color: '#4a9e42' }), []);

  const popupButtons = useMemo(
    () => [
      'cancel',
      {
        text: 'OK',
        keyCode: 'enter',
        handler: () => {
          tempEvent.resource = participants;
          tempEvent.title = title;

          if (isNewEvent) {
            setEvents([...myEvents, tempEvent]);
          } else {
            setEvents([...myEvents]);
          }

          // update event with the new properties on OK button click
          setIsNewEvent(false);

          setOpen(false);
        },
        cssClass: 'mbsc-popup-button-primary',
      },
    ],
    [isNewEvent, myEvents, participants, tempEvent, title],
  );

  const popupClose = useCallback(() => {
    if (isNewEvent) {
      setEvents(myEvents.filter((item) => item.id !== tempEvent.id));
    }
    setOpen(false);
  }, [isNewEvent, myEvents, tempEvent]);

  const titleChange = useCallback((ev) => {
    setTitle(ev.target.value);
  }, []);

  const changeParticipants = useCallback(
    (ev) => {
      const value = +ev.target.value;
      let p;

      if (ev.target.checked) {
        p = [...participants, value];
      } else {
        p = participants.filter((item) => item !== value);
      }
      setParticipants(p);
    },
    [participants],
  );

  return (
    <div>
      <Eventcalendar
        data={myEvents}
        resources={myResources}
        view={myView}
        clickToCreate={true}
        dragToCreate={true}
        dragToMove={true}
        dragToResize={true}
        onEventCreated={handleEventCreated}
        onEventDoubleClick={handleEventDoubleClick}
        onEventDeleted={handleEventDeleted}
        extendDefaultEvent={handleExtendDefaultEvent}
      />
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
          <Input label="Title" value={title} onChange={titleChange} inputStyle="box" labelStyle="stacked" />
          <div className="mbsc-padding">
            <label className="mbsc-txt-muted">Select event participants</label>
          </div>
          <SegmentedGroup select="multiple" value={participants} onChange={changeParticipants}>
            <Segmented value={1}>Ryan</Segmented>
            <Segmented value={2}>Kate</Segmented>
            <Segmented value={3}>John</Segmented>
          </SegmentedGroup>
        </div>
      </Popup>
    </div>
  );
}

export default App;