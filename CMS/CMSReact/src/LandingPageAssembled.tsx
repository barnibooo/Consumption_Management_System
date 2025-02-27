import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LandingPage from './LandingPage'
import Navbar from './Navbar'


 
createRoot(document.getElementById('root')!).render(
<StrictMode>
<Navbar />
<LandingPage />
</StrictMode>,
)