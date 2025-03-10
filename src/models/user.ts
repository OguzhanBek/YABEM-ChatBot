export interface User {
    avatar: string
    discordId: string
    displayName: string
    id: number
    joinedAt: number
    nickname: string

}

export interface discordUserData {
    accent_color: number
    avatar: string
    avatar_decoration_data: string
    banner: string
    banner_color: string
    discriminator: string
    email: string
    flags: number
    global_name: string
    id: string
    locale: string
    mfa_enabled: boolean
    premium_type: number
    public_flags: number
    username: string
    verified: boolean
}