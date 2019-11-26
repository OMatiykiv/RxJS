import { of, from, fromEvent, Observable, merge } from 'rxjs'; 
import { map, filter, reduce } from 'rxjs/operators';


// ******* exercise 1 *******
// console.clear();
// TODO: Filter only from a-gA-G
{
  const data = ['a', 'g', 'o', 'f', '3', '5', 'r', 'D', 'n', 'b', 's', 'c'];
  const source$ = from(data);
  const re = new RegExp(/[a-g]/i);

  source$.pipe(
    filter(res => re.test(res)
  )).subscribe(
    result => console.log(result)
  )
}

// ******* exercise 2 *******
// console.clear();
// TODO: Create a var `result` that contains the sum of all numbers in source.
{
  const data = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'];
  const source$ = from(data);

  let result = source$.pipe(
    filter(res => (/^[1-9]{1,}$/).test(res)),
    map(num => +num),
    reduce((sum, current) => sum + current 
  )).subscribe(
    result => console.log(result)
  )
}

// ******* exercise 3 *******
// console.clear();
// TODO: Create an RxJS Observable `observable` with the same behavior as the promise above.
{
  const promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('timeout');
      resolve(123);
    }, 1000);
    console.log('promise started');
  });
  promise.then(x => console.log('resolved: ' + x));

  let observable$ = new Observable(observer => {
    setTimeout(function () {
      console.log('timeout');
      observer.next(123);
    }, 1000);
    console.log('promise started');
  })
  observable$.subscribe(x => console.log('next: ' + x));  
}

// ******* exercise 4 *******
// console.clear();
// TODO: Create observable that calculates area of square using observables above
{
  const heightEl = (document.getElementById('height'));
  const widthEl = document.getElementById('width');

  let obs1 = fromEvent(heightEl, 'input');
  let obs2 = fromEvent(widthEl, 'input');
  let inputValueHeight = (<HTMLInputElement>heightEl);
  let inputValueWidth = (<HTMLInputElement>widthEl);

  let observable$ = merge(obs1, obs2);
  observable$.subscribe(() => { 
      let x = +inputValueHeight.value;
      let y = +inputValueWidth.value; 
      console.log(x * y)
  })
}