import Home from "./Component/Home"
import Navbar from "./Component/Navbar"
import ImageForm from "./Component/ImageForm"
import {Route,Switch} from "react-router-dom"
import ShowForm from "./Component/ShowForm";
import Loader from "./Component/Loader"

function App() {
  return (
   <>
        <Navbar/>
        <Loader/>
       <Switch>
        <Route exact path={"/"}>
            <Home/>
        </Route>
        <Route exact path="/new">
              <ImageForm type="new" title="Add Image" />
        </Route>
        <Route path="/edit">
              <ImageForm type="edit" title="Edit Image" />
        </Route>
        <Route path="/show">
              <ShowForm/>
        </Route>
       </Switch>
        
   </>
  );
}

export default App;
