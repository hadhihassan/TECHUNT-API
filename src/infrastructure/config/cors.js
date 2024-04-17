import cors from "cors";

// origin: 'https://techunt-7l0ushpny-hadhi-hassan-s-projects.vercel.app/',
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

const corsConfig = () => cors(corsOptions);

export default corsConfig;