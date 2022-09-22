import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'

const links = [
  { id: 1, text: 'form stats', path: '/', icon: <IoBarChartSharp /> },
  { id: 2, text: 'all forms', path: 'all-dataForms', icon: <MdQueryStats /> },
  { id: 3, text: 'add form', path: 'add-dataForm', icon: <FaWpforms /> },
  { id: 4, text: 'profile', path: 'profile', icon: <ImProfile /> },
]

export default links
