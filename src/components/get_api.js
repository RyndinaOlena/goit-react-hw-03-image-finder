import axios from "axios";




axios.defaults.baseURL = 'https://pixabay.com/api/'

axios.defaults.params = {
    key: '38889888-f93d23a01a33db07a0e444aa5',
    image_type: 'photo',
    orientation: 'horizonal',
    safesearch: true,
    per_page: 12,
}

export const fetchImg = async ({ searchName, page }) => {
    const { data } = await axios(`/?q=${searchName}&page=${page}`)
    return data
}
