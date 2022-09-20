import { useEffect } from 'react';

declare global {
  interface Window {
    electron: {
      send: <T>(channel: string, args?: T) => void;
      receive: (channel: string, cb: (...args: any[]) => void) => void;
      remove: (channel: string) => void;
    };
  }
}

export default function App() {
  const handleFocus = () => {
    console.log('message passed');
    window.electron.send('focus', 'message to pass to electron backend');
  };

  useEffect(() => {
    const onFocus = (res: string) => {
      alert(res);
    };

    window.electron.receive('focus', onFocus);

    return () => {
      window.electron.remove('focus');
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Call focus on renderer</p>
        <button onClick={handleFocus}>Focus</button>
      </header>
    </div>
  );
}
