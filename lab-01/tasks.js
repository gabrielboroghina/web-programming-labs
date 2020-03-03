console.log(new Date());

let a = [];
for (let i = 0; i <= 100; i++)
    a.push(i);

for (let el of a)
    if (el % 2 === 0)
        console.log(el);


function getElement(arr, idx) {
    return arr[idx];
}

const pos = 10;
console.log(`The ${pos}-th element`, getElement(a, pos));