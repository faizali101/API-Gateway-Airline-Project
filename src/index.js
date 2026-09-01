const express = require('express');
const rateLimit = require('express-rate-limit');
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const app = express();
const limiter = rateLimit({
    windowMs: 2 *  60 * 100,
    max : 5
})
const { createProxyMiddleware } = require('http-proxy-middleware');


app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(limiter);

app.use('/flightservice/home', createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true
}))

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});

/**
 * reverse proxy // 
 * user 
 *  ||
 *  v
 *  localhost:3001/flightservice/api/v1/bookings (API Gateway) localhost:4000/api/v1/bookings
 *  ||
 *  v
 * localhost:300/api/v1/flights
 */