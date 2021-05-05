import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {FaImage, FaChevronLeft} from 'react-icons/fa'
import {useState} from 'react'
import{useRouter} from 'next/router'
import Link  from 'next/link'
import Modal  from '@/components/Modal'
import ImageUpload  from '@/components/ImageUpload'
import Image  from 'next/image'
import {API_URL} from '@/config/index'
import styles from '@/styles/Form.module.css'

import Layout from '@/components/Layout'

export default function EditEventPage({evt}) {


  const [values, setValues] = useState({
    name        :evt.name,
    performers  :evt.performers,
    venue       :evt.venue,
    address     :evt.address,
    date        :evt.date,
    time        :evt.time,
    description :evt.description
  })

  const [imagePreview, setImagePreview] = useState(evt.image ? evt.image.formats.thumbnail.url : null);

  const [showModal, setShowModal] = useState(false)
  const router = useRouter() 

  const handleSubmit = async (e)=>{
    e.preventDefault();
    // Validation: Do some basic validation, some is array method
    const hasEmptyFields = Object.values(values).some((element) => element === '')

    if(hasEmptyFields) {
      toast.error('Please fill the field')
    }

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(values)
    })

    if(!res.ok) {
      toast.error('Something went wrong')
    } else {
      const evt = await res.json()
      router.push(`/events/${evt.slug}`)
    }
  }
  
  const handleInputChange =(e)=>{
    const {name, value} = e.target;
    setValues({...values, [name]:value})
  }

  const imageUploaded = async (e)=>{
   //get the latest image and preview of that image
   const res = await fetch(`${API_URL}/events/${evt.id}`)
   const data = await res.json()
   setImagePreview(data.image.formats.thumbnail.url);
   setShowModal(false);
  }

  return (
    <Layout title='Add New Event'>
     
      <Link href='/events'>
        <a className='btn-secondary'><FaChevronLeft /> Go back</a>
      </Link>

      <h1>Update Event</h1>

      <ToastContainer />

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input type="text" name="name" id="name" value={values.name} onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input type="text" name="performers" id="performers" value={values.performers} onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input type="text" name="venue" id="venue" value={values.venue} onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" id="address" value={values.address} onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input type="date" name="date" id="date" value={moment(values.date).format('yyyy-MM-DD')} onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input type="text" name="time" id="time" value={values.time} onChange={handleInputChange}/>
          </div>
        </div>
          <div>
            <label htmlFor="description">Event Description</label>
            <textarea type="text" name="description" id="description" value={values.description} onChange={handleInputChange}></textarea>
          </div>

          <input type="submit" value="Update Event" className="btn"/>
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170}/>
      ) : (
      <div>
        <p>No Image uploaded</p>
      </div>
      )}

      <div>
        <button onClick={()=> setShowModal(true)} className="btn btn-secondary"><FaImage /> Set Image</button>
      </div>

      <Modal show={showModal} onClose={()=> setShowModal(false)}>
        <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  )
}

export async function getServerSideProps({params: {id}, req}) {

  const res = await fetch(`${API_URL}/events/${id}`)
  const evt = await res.json()

  //console.log(req.headers.cookie);

  return {
    props: {
      evt
    }  
  }
}