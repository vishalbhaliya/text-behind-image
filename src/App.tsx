import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/ui/navigation/nav-bar';
import Home from './pages/Home';
import TextBehindImage from './pages/TextBehindImage';
import About from './pages/About';

function App() {
  return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" Component={Home} />
            <Route key={"text-behind-image"} path="/text-behind-image" Component={TextBehindImage} />
            <Route path="/about" Component={About} />
          </Routes>
        </main>
      </div>
  );
}

export default App;