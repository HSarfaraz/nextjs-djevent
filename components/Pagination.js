import Link from 'next/link'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'
import {API_URL, PER_PAGE} from '@/config/index'

export default function Pagination({page, total}) {

   // Calculating the last page for pagination purposes
  const lastPage = Math.ceil(total/ PER_PAGE)

  return (
    <>
       {/* Pagination Links*/}
      {page >1 && (
        <Link href={`/events?page=${page -1}`}>
          <a className='btn-secondary'> <FaChevronLeft/> Prev</a>
        </Link>
      )}
      {' '}
      {page < lastPage && (
        <Link href={`/events?page=${page +1}`}>
          <a className='btn-secondary'>  Next <FaChevronRight/></a>
        </Link>
      )}
    </>
  )
}
