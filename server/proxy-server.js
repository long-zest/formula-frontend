const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001; // Cổng của máy chủ trung gian

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Thay đổi URL này nếu cần thiết
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// Định nghĩa tuyến dẫn "/data"
app.get('/data', async (_req, res) => {
    try {
        const response = await axios.get('https://www.formula1.com/en/results.html/2023/races/1211/spain/race-result.html'); // Thực hiện yêu cầu từ máy chủ trung gian đến https://www.formula1.com/
        res.send(response.data); // Trả về dữ liệu từ trang web Formula 1
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Khởi động máy chủ trung gian
app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
