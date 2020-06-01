const data = `16.749518 
10.792466
10.502184
10.520912
10.499712
10.555983
12.746491
11.769263
10.930478
10.749035
10.759134
10.632159
10.679269
10.417404
10.778477
10.976163
11.558202
12.299838
10.558636
10.565701
11.123372
11.010772
10.719762
13.208778
10.401052
10.930994
12.765098
10.54473
16.417145
12.655139
10.57843
10.470398
12.219294
10.734644
10.78726
10.696242
10.577584
10.579607
10.544792
10.480447
10.634457
12.49453
10.844725
10.745229
11.046983
11.504453
11.056755
10.946032
15.862738
10.569599`.split("\n");

const mean = 11.25392955;

let res = 0;

for (let elem of data) {
	res += (elem - mean) ** 2;
}

res /= data.length;

console.log(res);
