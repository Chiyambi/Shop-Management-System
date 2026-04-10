import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import managerLogo from '../assets/manager.png'

const ProtectedRoute = ({ children }) => {
  const { userProfile, loading, initialLoading } = useShop()
  const navigate = useNavigate()

  useEffect(() => {
    // Only redirect if NOT booting AND NOT currently fetching data
    if (!initialLoading && !loading && !userProfile) {
      navigate('/login', { replace: true })
    }
  }, [initialLoading, loading, userProfile, navigate])

  if (initialLoading || (!userProfile && loading)) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '112px',
              height: '112px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(184, 134, 11, 0.18), rgba(184, 134, 11, 0.05))',
              border: '1px solid rgba(184, 134, 11, 0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 18px 40px rgba(184, 134, 11, 0.18)',
              animation: 'pulse 1.5s infinite'
            }}
          >
            <img
              src={managerLogo}
              alt="Loading..."
              style={{
                width: '72px',
                height: '72px',
                objectFit: 'contain',
                borderRadius: '18px'
              }}
            />
          </div>
          <style>{`
            @keyframes pulse { 
              0% { opacity: 0.6; transform: scale(0.95); } 
              50% { opacity: 1; transform: scale(1.05); } 
              100% { opacity: 0.6; transform: scale(0.95); } 
            }
          `}</style>
        </div>
      </div>
    )
  }

  return userProfile ? children : null
}

export default ProtectedRoute
