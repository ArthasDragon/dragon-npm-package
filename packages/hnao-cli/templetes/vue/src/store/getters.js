export default {
  limmitCount: state => {
    return state.count < 10 ? 10 : state.count
  }
}
