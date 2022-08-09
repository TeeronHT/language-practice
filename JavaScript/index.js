// require the express package in this file
// and store it in a variable for later use
const express = require('express');

// create a new instance of `express`
const app = express();

// Configure application
app.set('views', __dirname + '/src/views');
app.set('view engine', 'twig');

// give our app some basic rules about what to
// do with a web request
// __dirname returns a value of a path to the current directory
app.get('/', (request, response) => {
    const context = buildContext();

    response.render('pages/home', context);
});

app.get('/new-thread', (request, response) => {
    const context = buildContext();

    response.render('pages/new-thread', context);
});

app.get('/threads', (request, response) => {
    const context = buildContext();
    
    response.render('pages/threads', context);
});

app.get('/threads/:id', (request, response) => {
    const id = request.params.id;
    const context = buildContext({ id: id });

    response.render('pages/thread-detail', context);
});

app.use('/assets', express.static('src'));

const navigation = [
    {
        text: 'Home',
        type: 'link',
        url: '/'
    },
    {
        text: 'Threads',
        type: 'link',
        url: '/threads',
    },
    {
        text: 'New Thread',
        type: 'button',
        url: '/new-thread'
    }
];

function buildContext(ctx) {
    // define the default context for rendering
    let defaultContext = {
        navigation: navigation
    };

    if (!ctx) {
        // Return the defaultContext
        return defaultContext;
    }

    // merge the defaultContext and ctx into an empty object
    // then return it
    return Object.assign({}, defaultContext, ctx);
}

// tell our app what port to listen for requests on
app.listen(3000, () => {
    console.log('App is listening on localhost:3000...');
});