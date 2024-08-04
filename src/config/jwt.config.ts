export const jwtConfig = { 
    secret: process.env.JWT_SECRET,
    token_type: 'bearer',
    ttl: parseInt(process.env.JWT_TTL, 10) * 60
}
