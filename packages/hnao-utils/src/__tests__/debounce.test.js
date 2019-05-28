import { debounce } from '../debounce'
import { infiniteTimerGame } from '../infiniteTimer'

let num = 0
const add = function(){
  num++
}
const debounceAdd = debounce(add)

test('debounce', () => {

})
