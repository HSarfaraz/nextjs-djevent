import {FaSignInAlt, FaSignOutAlt, FaFish} from 'react-icons/fa'
import {useContext} from 'react'
import Link from 'next/link'
import Search from './Search'
import AuthContext from '@/context/AuthContext'
import styles from '@/styles/Header.module.css'

export default function Header() {

  const {user, logout} = useContext(AuthContext)
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a><FaFish className={styles.fishlogo} />Fishing Events</a>
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href='/events'>
              <a>Events</a>
            </Link>
          </li>

          {/* If we are user, then we are logged in */}
          {user ? (
            // if logged in
            <>
              <li>
                <Link href='/events/add'>
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <Link href='/account/dashboard'>
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button onClick={() => logout()} className="btn-white btn-icon">
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
                <li>
                  <Link href='/account/login'>
                    <a className="btn btn-white btn-icon"> <FaSignInAlt/> Login</a>
                  </Link>
                </li>
            </>
          )}
          
        </ul>
      </nav>
    </header>
  )
}
