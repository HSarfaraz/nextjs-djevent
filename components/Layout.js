import Head from 'next/head'
import {useRouter} from 'next/router'
import Header from './Header'
import Footer from './Footer'
import Showcase from './Showcase'
import styles from '@/styles/Layout.module.css'

export default function Layout({ title, keywords, description, children}) {

  const router = useRouter()
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description}/>
        <meta name='keywords' content={keywords}/>
      </Head>

      <Header />
      {/* It means show the show case for route / home page only */}
      {router.pathname === '/' && <Showcase /> } 
      <div className={styles.container}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title: 'Fishing Events | Find the coolest parties',
  description: 'Find the latest Fishing and other musical events',
  keywords: 'family, Fishing, holiday, events'
}
