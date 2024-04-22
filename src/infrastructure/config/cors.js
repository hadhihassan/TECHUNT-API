import cors from "cors";

const corsOptions = {
    origin: 'https://techunt.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
const corsConfig = () => cors(corsOptions);

export default corsConfig;