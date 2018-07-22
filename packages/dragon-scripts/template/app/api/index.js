import { createApi } from 'hlj-fetch'

export default {
  logout: createApi('/p/wedding/index.php/Admin/APIAuth/logout')
}
