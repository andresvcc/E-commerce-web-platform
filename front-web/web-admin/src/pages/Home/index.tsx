import React from 'react';
import { useState } from 'react';
import Header from '../../components/Header';
import { Button, Typographie } from 'ui-ux';
import ANSIToHTML from 'ansi-to-html';

export type OutputConsoleProps = {
  output: string[];
};

export function OutputConsole({ output }: OutputConsoleProps) {
  return (
    <div
      className="w-full h-full bg-black text-white rounded-md shadow-sm p-2"
      style={{ height: '300px', overflow: 'scroll', backgroundColor: 'black', color: 'white' }}
    >
      {output.map((line, index) => (
        <p key={index} dangerouslySetInnerHTML={{ __html: line }} />
      ))}
    </div>
  );
}

function Home(props: any) {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [currentUrl, setUrl] = useState<string>();

  const ANSIConverter = new ANSIToHTML();

  return (
    <div className="Home" data-testid="home-page-container">
      <Header />
      {props.dsd}
      <div className="card">
        <Button
          bgcolor="#706F6F"
          bgGradient="#8ecae6"
          textcolor="#FFFFFF"
          variant="contained"
          width="100%"
          onClick={() => setIsRunning(true)}
        >
          count is {isRunning ? 'Y' : 'N'}
        </Button>
      </div>
      <div>
        <Typographie>currentUrl: {currentUrl}</Typographie>
        <OutputConsole output={output} />
      </div>
      <p>ceci est a texte de test</p>
    </div>
  );
}

export default Home;
