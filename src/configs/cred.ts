import dotenv from 'dotenv'
dotenv.config()

export namespace ServerConfig{
    export const PORT = process.env.PORT
    export const NODE_ENV = process.env.NODE_ENV
}

export namespace Mailer{
    export const APP_PASSWORD = process.env.APP_PASSWORD
}

export namespace JWT{
    export const JWT_SECRET = process.env.JWT_SECRET as string
}

export namespace Environment{
    export const NODE_ENV = process.env.NODE_ENV as string
    export const BASE_URL = process.env.BASE_URL as string
    export const REDIRECT_URL = process.env.REDIRECT_URL as string
    export const ORIGIN = process.env.ORIGIN as string
}

export namespace Database{
    export const DATABASE_URL = process.env.DATABASE_URL as string
}

export namespace Cloudinary{
    export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY as string
    export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET as string
    export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME as string
}

export namespace Google{
    export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
    export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
    export const CALLBACK_URL = process.env.CALLBACK_URL
}