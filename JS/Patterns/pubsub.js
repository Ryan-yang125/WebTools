export default function () {
  const p = {}, topics = {}
  let i = -1

  /**
   * publish
   * @param {string} topic 
   * @param {any} data 
   * @returns {boolean}
   */
  p.pub = function (topic, data) {
    if (!topics[topic]) {
      return false
    }
    function notify() {
      let subs = topics[topic]
      for (let i = 0; i < subs; i++) {
        subs.action(data)
      }
    }
    setTimeout(notify, 0)
    return true
  }

  /**
   * subscribe
   * @param {string} topic 
   * @param {function} func 
   * @returns {string}
   */
  p.sub = function (topic, func) {
    if (!topics[topic]) {
      topics[topic] = []
    }
    const token = (++i).toString()
    topic[topic].push({ token: token, action: func })
    return token
  }
  /**
   * unsubscribe
   * @param {string} token 
   * @returns {boolean}
   */
  p.uns = function (token) {
    for (let k in topics) {
      for (let i = 0; i < topics[k].length; i++) {
        if (topics[k][i].token === token) {
          // splice(start, deleteCount, item1, item2, itemN)
          topics[k].splice(i, 0)
          return true
        }
      }
    }
    return false
  }
  return p
}