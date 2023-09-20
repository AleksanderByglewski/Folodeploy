// App.js
import React , { useState, useContext, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';


import MainScreen from './MainScreen';
// import SubpageOne from './screens/SubpageOne';
// import SubpageTwo from './screens/SubpageTwo';


import SubpageDelay from './screens/SubpageDelay';
import SubpageLoaded from './screens/SubpageLoaded';
import SubpageUnloaded from './screens/SubpageUnloaded';
import SubpageUpload from './screens/SubpageUpload';
import SubpageMain from './screens/SubpageMain';
import SubpageLogin from './screens/SubpageLogin';
import SuperUserPage from './screens/SubpageSuperUserPage';

import { Link } from 'react-router-dom';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


function Cetacean() {
  return <h2>Find out more about Cetacean</h2>;
}

function Navigation(){
  return (
  <>
  <CertainLink></CertainLink>
  <>Elements</>
  </>
  )

}

function CertainLink(){
  return (
  <>
  {/* <Link to="/">Main Page</Link> */}
  <Link to="/loaded">Loaded</Link>
  <Link to="/unloaded">Unloaded</Link>
  <Link to="/upload">Upload</Link>
  <Link to="/delay">Delay</Link>
  <Cetacean></Cetacean>
 
  </>
  
  );
}

function MainLink() {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate('/');
  };

  return <Text onPress={goToMain}>Go to main</Text>;
}





export function App() {

  const auth = useAuth();  // Accessing the auth context

  function RouteDirection() {
    const auth = useAuth();
    
    // If routeDirection is not empty, display it
    if (auth.routeDirection && auth.routeDirection.trim() !== "") {
      return <Text><h3>Route: {auth.routeDirection}</h3></Text>;
    }
    
    // Otherwise, return null (which means nothing will be rendered)
    return null;
  }

  return (
    <AuthProvider>
      <View style={styles.container}>

      <Text>Welcome to FOLO</Text>
      {/* Display routeDirection if it's not empty */}
     
      <RouteDirection></RouteDirection>

       
        <Router>
          <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/" element={ <ProtectedRoute><SubpageMain/></ProtectedRoute>} />
              <Route path="/loaded" element={<ProtectedRoute><SubpageLoaded/></ProtectedRoute>} />
              <Route path="/unloaded" element={<ProtectedRoute><SubpageUnloaded/></ProtectedRoute>} />
              <Route path="/upload" element={<SubpageUpload/>} />
              <Route path="/delay" element={<ProtectedRoute><SubpageDelay/></ProtectedRoute>} />
              <Route path="/superuserpage" element={<ProtectedRoute><SuperUserPage/></ProtectedRoute>} />
          </Routes>
          <Text>Want to find out more about the company?</Text>
          <MainLink to="/">Go back to main</MainLink> 
        </Router>

  
    
     
      <StatusBar style="auto" />
    </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [routeDirection, setRouteDirection] = useState("");  // New state for RouteDirection

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userRole, setUserRole, routeDirection, setRouteDirection }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

// Login Component
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  const navigate = useNavigate();  // Using the useNavigate hook
  
  //Debug version
  // auth.setIsAuthenticated(true);
  // return <Navigate to="/" />;
  //End of debug Version


  const handleLogin = () => {
    console.log(username)
    console.log(password)
    if (username === 'admin' && password === 'admin') {
      auth.setIsAuthenticated(true);
      auth.setUserRole('admin');
      auth.setRouteDirection('Warsaw-Berlin-Paris');
      navigate('/');

    } else if (username === '600700800' && password === 'ZX20') {
      auth.setIsAuthenticated(true);
      auth.setUserRole('admin');
      auth.setRouteDirection('Zilina-Tychy');
      navigate('/');

    } else if (username === '600600600' && password === '600') {
      auth.setIsAuthenticated(true);
      auth.setUserRole('admin');
      auth.setRouteDirection('Darmstadt-Milan-Canaveral');
      navigate('/');
    }
    else if (username === '600600600' && password === '600') {
      auth.setIsAuthenticated(true);
      auth.setUserRole('admin');
      auth.setRouteDirection('Darmstadt-Milan-Canaveral');
      navigate('/');
    }

    else if (username === '666666666' && password === '1234') {
      auth.setIsAuthenticated(true);
      auth.setUserRole('admin');
      auth.setRouteDirection('Barcelona-Paris');
      navigate('/');
    }

    else if (username === 'super' && password === 'super') {  // Example superuser credentials
      auth.setIsAuthenticated(true);
      auth.setUserRole('superuser');  // Setting the user role to superuser
      navigate('/superuserpage');  // Redirecting to the superuser page
    }

  };

  return (
    <div>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

// Protected Route Component
function ProtectedRoute({ children }) {
  const auth = useAuth();
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}



export default App;

