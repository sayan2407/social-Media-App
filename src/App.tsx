
import AuthLayout from './_auth/AuthLayout';
import SigninForm from './_auth/Forms/SigninForm';
import SignupForm from './_auth/Forms/SignupForm';
import RootLayout from './_root/RootLayout';
import { Home } from './_root/pages';

import './globals.css';

import { Routes, Route } from 'react-router-dom';

const App = () => (
    <main className="flex h-screen">
        <Routes>
            {/* Public Routes */}
            <Route element={<AuthLayout />}>
                <Route path="/sign-in" element={<SigninForm />} />
                <Route path="/sign-up" element={<SignupForm />} />

            </Route>
           

            {/* private Routes */}
            <Route element = {<RootLayout/>}>
                <Route  index element = {<Home/>} />
                {/* <Route path="/explore"  element = {<Explore/>} />
                <Route path="/saved"  element = {<Saved/>} />
                <Route path="/all-users"  element = {<AllUsers/>} />
                <Route path="/explore"  element = {<Explore/>} />
                <Route path="/explore"  element = {<Explore/>} /> */}

            </Route>
        </Routes>

    </main>
)

export default App;