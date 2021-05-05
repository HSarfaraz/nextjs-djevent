import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {FaPencilAlt, FaTimes, FaChevronLeft} from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/router'
import Layout from '@/components/Layout'
import {API_URL} from '@/config/index'
import styles from '@/styles/Event.module.css'

export default function EventPage({evt}) {

   const router = useRouter();
  // console.log(router);

  const deleteEvent = async (e) => {
    if(confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${evt.id}`,{
      method: 'DELETE'
      })

      const data = await res.json()

      if(!res.ok){
        toast.error(data.message);
      } else {
        router.push('/events');
      }
    }
  }

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
            <Link href={`/events/edit/${evt.id}`}>
              <a><FaPencilAlt /> Edit Events</a>
            </Link>
            <a href="#" onClick={deleteEvent}
               className={styles.delete}><FaTimes /> Delete Events
            </a>
        </div>

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