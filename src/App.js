import './App.css';
import Classifier from "./components/classifier/Classifier";
import ClassifiedImageList from "./components/classifiedImageList/ClassifiedImageList";
import Navigation from "./components/navigation/Navigation";
import { Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navigation />
            <div className='App'>
                <Route exact path='/' component = {Classifier} />
                <Route path='/history' component = {ClassifiedImageList}/>
            </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
