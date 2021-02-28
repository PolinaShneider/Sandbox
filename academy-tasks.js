// var urls = [
//     'https://api.github.com/users/o0',
//     'https://api.github.com/users/zeckson',
//     'https://api.github.com/users/fyvfyv'
// ];
//
// var template = document.querySelector('#btnTemplate').content;
//
// function downloadData(url) {
//     var xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//         drawButton(this);
//     };
//
//     xhr.open('GET', url, true);
//     xhr.send();
// }
//
// function onClick(evt, data) {
//     document.body.insertAdjacentHTML('beforeEnd', '<p>' + 'ID: '+ data.id + '\nName: ' + data.name + '</p>');
// }
//
// function drawButton(xhr) {
//     var data = JSON.parse(xhr.response);
//     var btnFragment = template.cloneNode(true);
//
//     var btn = btnFragment.querySelector('button');
//     btn.addEventListener('click', function (evt) {
//         onClick(evt, data)
//     });
//     btn.textContent = data.login;
//     btn.setAttribute('id', data.id);
//
//     document.body.appendChild(btn);
// }
//
// urls.forEach(function(url) {
//     downloadData(url);
// });

fetch('https://www.boredapi.com/api/activity')
    .then(response => response.json())
    .then(data => console.log(data));
