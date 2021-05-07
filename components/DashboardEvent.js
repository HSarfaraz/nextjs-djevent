import Link from 'next/link'
import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import styles from '@/styles/DashboardEvent.module.css'

export default function DashboardEvent({evt, handleDelete}) {

  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt.slug}`}>
          <a>{evt.name}</a>
        </Link>
      </h4>
      <Link href={`/events/edit/${evt.id}`}>
        <a className="btn-edit">
          <FaPencilAlt /> <span>Edit Event</span>
        </a>
      </Link>
      <a href="#" onClick={() => handleDelete(evt.id)} className="btn-delete">
        <FaTimes /> <span>Delete</span>
      </a>
    </div>
  )
}


/*

 
   <div className={styles.controls}>
            <Link href={`/events/edit/${evt.id}`}>
              <a><FaPencilAlt /> Edit Events</a>
            </Link>
            <a href="#" onClick={deleteEvent}
               className={styles.delete}><FaTimes /> Delete Events
            </a>
        </div>
*/ 