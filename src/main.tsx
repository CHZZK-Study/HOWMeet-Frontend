import ReactDOM from 'react-dom/client';
import App from './App';

// const mocking = async (): Promise<void> => {
//   const isDev = import.meta.env.DEV;
//   if (!isDev) {
//     const { worker } = await import('./mocks/browser');
//     worker.start();
//   }
// };

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
