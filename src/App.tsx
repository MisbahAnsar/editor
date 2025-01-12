import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Moon, Sun } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import CodeEditor from './components/CodeEditor';

export default function App() {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Code Editor</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
          <CodeEditor />
        </div>
      </div>
    </ThemeProvider>
  );
}