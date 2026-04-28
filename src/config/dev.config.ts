import { url } from "inspector";

export default ()=>({
    port:process.env.PORT,
    db:{
        url:process.env.DB_URL
    },
    tokenAccess:{},
    cloud:{},
    access:{
        jwt_secret:process.env.JWT_SECRET
    },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackUrl: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback'
    }
});