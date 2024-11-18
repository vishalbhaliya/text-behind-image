import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/ui/navigation/nav-bar';
import Home from './pages/Home';
import TextBehindImage from './pages/TextBehindImage';
import ImageEditor from './pages/ImageEditor';
import About from './pages/About';

function App() {
  return (
    <Router basename='/'>
      <div className="min-h-screen bg-background">
        <NavBar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route key={"text-behind-image"} path="/text-behind-image" element={<TextBehindImage />} />
            <Route path="/image-editor" element={<ImageEditor />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;