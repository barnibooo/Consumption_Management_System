import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './OrderPage.css'
import ProfilePage from './ProfilePage.tsx'
 
createRoot(document.getElementById('root')!).render(
<StrictMode>
    <ProfilePage />
</StrictMode>,
)