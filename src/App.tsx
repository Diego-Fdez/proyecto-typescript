import { useEffect, useRef, useState } from 'react';
import './App.css';
import Form from './components/Form';
import List from './components/List';
import { Sub, SubsResponseFromApi } from './types';

/* Defining the shape of the state object. */
interface AppState {
  subs: Array<Sub>;
  newSubsNumber: number;
};

function App() {
  const divRef = useRef<HTMLDivElement>(null);
  const [subs, setSubs] = useState<AppState['subs']>([]);
  const [newSubsNumber, setNewSubsNumber] = useState<AppState['newSubsNumber']>(0);

  useEffect(() => {
    const fetchSubs = async (): Promise<SubsResponseFromApi> => {
      return await fetch('http://localhost:3001/subs')
      .then(res => res.json())
    }

    const mapFrommApiToSubs = (apiResponse: SubsResponseFromApi):
    Array<Sub> => {
      return apiResponse.map(subFromApi => {
        const {
          nick,
          months: subMonths,
          profileUrl: avatar,
          description
        } = subFromApi

        return {
          nick,
          description,
          avatar,
          subMonths,
        }
      })
    }

    fetchSubs()
      .then(mapFrommApiToSubs)
      .then(setSubs)
  }, [])

  /**
   * HandleNewSub is a function that takes a newSub argument of type Sub and returns nothing.
   * @param {Sub} newSub - Sub - this is the new sub that was added to the database
   */
  const handleNewSub = (newSub: Sub): void => {
    setSubs(subs => [...subs, newSub]);
    setNewSubsNumber(n => n + 1);
  }

  return (
    <div className="App" ref={divRef}>
      <h1>Diego subs</h1>
      <List subs={subs}  />
      New Subs: {newSubsNumber}
      <Form onNewSub={handleNewSub} />
    </div>
  );
}

export default App;
