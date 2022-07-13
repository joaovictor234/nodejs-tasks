const http = require('http');

const users = [];

http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === "/") {
        res.write('<html>');
        res.write('<body>');
        res.write('<h1>Hello, welcome to my page!</h1>');
        res.write('<form action="/create-user" method="POST">');
        res.write('<label for="username">Username: </label><input id="username" name="username" type="text"/><button>SEND</button>')
        res.write('</form>');
        res.write('<a href="/users">view registered users</a>')
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    if(url === "/create-user" && method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString().split('=')
            users.push(parsedBody[1]);
            console.log(users)
            return res.end(`
                <p>New user: ${parsedBody[1]}</p>
                <a href="/">return</a>
                <a href="/users">view users</a>`)
        })
    }

    if(url === "/users") {
        if(users.length === 0) {
            return res.end('<p>There is no one user register</p><a href="/">return</a>');
        } else {
            res.write('<p>Users registered</p>');
            res.write('<ul>');
            users.map(user => {
                res.write(`<li>${user}</li>`)
            })
            res.write('</ul>');
            res.write('<a href="/">return</a>')
            return res.end();
        }
    }

}).listen(3000);