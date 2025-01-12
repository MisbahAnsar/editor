import { useRef, useState, useEffect } from 'react';
import { Button, Paper } from '@mui/material';
import { Play, FileCode } from 'lucide-react';

const EDITOR_URL =
  'https://onecompiler.com/embed/javascript?listenToEvents=true&codeChangeEvent=true&hideStdin=true';

export default function CodeEditor() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const [code, setCode] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('editorCode') || '';
    }
    return '';
  });

  // Save code to localStorage whenever it changes
  useEffect(() => {
    if (code) {
      localStorage.setItem('editorCode', code);
      console.log('Code saved to localStorage:', code);
    }
  }, [code]);

  // Populate code in the iframe
  const populateCode = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        {
          eventType: 'populateCode',
          language: 'python',
          files: [
            {
              name: 'HelloWorld.py',
              content: code,
            },
          ],
        },
        '*'
      );
    }
  };

  useEffect(() => {
    populateCode(); // Populate iframe on mount
  }, []);

  return (
    <div className="space-y-4">
      <Paper elevation={3} className="p-4">
        <div className="flex gap-4 mb-4">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (iframeRef.current) {
                iframeRef.current.contentWindow?.postMessage(
                  { eventType: 'triggerRun' },
                  '*'
                );
              }
            }}
            startIcon={<Play size={20} />}
          >
            Run Code
          </Button>
          <Button
            variant="outlined"
            onClick={populateCode}
            startIcon={<FileCode size={20} />}
          >
            Load Saved Code
          </Button>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Type your code here"
          className="w-full p-2 border rounded"
        />
        <iframe
          ref={iframeRef}
          id="oc-editor"
          height="450px"
          width="100%"
          src={EDITOR_URL}
          title="OneCompiler Editor"
        />
      </Paper>
    </div>
  );
}
