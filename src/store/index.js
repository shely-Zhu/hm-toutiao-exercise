const KEY = 'hm-exsercise'
export default {
  setUser (user) {
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  cleanUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
