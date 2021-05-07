import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {FaChevronLeft} from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/router'
import Layout from '@/components/Layout'
import EventMap from '@/components/EventMap'
import {API_URL} from '@/config/index'
import styles from '@/styles/Event.module.css'

export default function EventPage({evt}) {

   const router = useRouter();
  // console.log(router);

  return (
    <Layout>
      <div className={styles.event}>
       

        <div className={styles.whitebanner}>
          <span>{new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}</span>
          <h1>{evt.name}</h1>
        </div>

         <ToastContainer />

        {/* First check if image exists */}
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image.formats.medium.url} width={960} height={600} />
          </div>
        )}

        <div className={styles.whitebanner}>
          <h3>Performers:</h3>
          <p>{evt.performers}</p>
        </div>
         
        <div className={styles.whitebanner}>
          <h3>Description:</h3>
          <p>{evt.description}</p>
          <p>Venue: {evt.venue}</p>
          <p>{evt.address}</p>
        </div>

        <EventMap evt={evt}/>

        <Link href='/events'>
          <a className='btn'><FaChevronLeft /> Go back</a>
        </Link>

      </div>
    </Layout>
  )
}

// export async function getStaticPaths() {

//   const res = await fetch(`${API_URL}/events`)
//   const events = await res.json()
//   const paths = events.map(evt => ({
//     params:{slug: evt.slug}
//   }))

//   return {
//     paths,
//     fallback: true 
//   }
// }

// export async function getStaticProps({params: {slug}}) {

//   const res = await fetch(`${API_URL}/events?slug=${slug}`)

//   const events = await res.json()
//   return {
//     props: {
//       evt: events[0]
//     },
//     revalidate: 1  
//   }
// }


export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`)
  const events = await res.json()

  return {
    props: {
      evt: events[0],
    },
  }
}