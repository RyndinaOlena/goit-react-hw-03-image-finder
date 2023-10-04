import axios from "axios";




axios.defaults.baseURL = 'https://pixabay.com/api/'

axios.defaults.params = {
    page: 1,
    key: '38889888-f93d23a01a33db07a0e444aa5',
    image_type: 'photo',
    orientation: 'horizonal',
    safesearch: true,
    per_page: 12,
}

export const fetchImg = async (query, page) => {
    axios.defaults.params.q = query || ''
    axios.defaults.params.page = page || 1
    const { data } = await axios.get()
    return data
}
