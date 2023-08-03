import { useRef, useState } from 'react';
import styles from './app.module.scss';
import ArtBoard from './components/art-board';
import { PiArt } from './components/pi-art';
import { TextField } from '@mui/material';

export function App() {
  const artBoard = useRef(null);
  const [height, setHeight] = useState(2778)
  const [width, setWidth] = useState(1284)
  return (
    <>
      <TextField type="number" onChange={(e) => setHeight(+e.target.value || 0)} value={height} label='height'/>
      <TextField type="number" onChange={(e) => setWidth(+e.target.value || 0)} value={width} label="width" />
      <ArtBoard  height={height} width={width} border={"1px solid black"}/>
      {/* <PiArt  height={8640} width={17280} border={"1px solid black"}/> */}
    </>
  );
}

export default App;
