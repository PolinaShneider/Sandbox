const data = [
    {
        name: 'Terry',
        password: 'Terry1234',
        role: 'admin'
    },
    {
        name: 'Robert',
        password: 'Robert1234',
        role: 'user'
    }
];

// Запись данных
localStorage.setItem('users', JSON.stringify(data));

// Получение данных
const storageData = JSON.parse(localStorage.getItem('users')) || [];

// Обновление данных
localStorage.setItem('users', JSON.stringify([...storageData, {
    name: 'Maria',
    password: 'Maria1234',
    role: 'user'
}]));
