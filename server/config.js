module.exports = {
    web_default_port: process.env.POCWEB_PORT || 80,        // web服务端口
    cookie_key: 'www.goldwind.cn',                   // cookie签名键
    session_maxage: 3600000 * 24 * 6,                // 会话周期6天
    expires: {                                       // 缓存配置
        fileMatch: /^(gif|png|jpg|js|css|eot|svg|ttf|woff|woff2|map)$/ig,
        maxAge: 60 * 60 * 24 * 365
    }
};
