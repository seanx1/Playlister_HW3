import './App.css';
import { React } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Banner, ListSelector, PlaylistCards, Statusbar } from './components'
// import DeleteListModal from './components/DeleteListModal';
// import DeleteListModal from './components/DeleteModal';
//ADDED
// import DeleteSongModal from './components/DeleteSongModal.js'
// import { EditToolbar } from './components'

//Still need to work on edit list name modal and stuff


/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
const App = () => {
    return (
        <Router>
            <Banner />
            <Switch>
                <Route path="/" exact component={ListSelector} />
                <Route path="/playlist/:id" exact component={PlaylistCards} />
                {/* <Route path="/playlist/:id" exact component={EditToolbar} /> */}
            </Switch>
            <Statusbar />
        </Router>
    )
}

export default App