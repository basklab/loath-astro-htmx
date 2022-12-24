import type { AstroCookies } from "astro/dist/core/cookies"
import { sealData, unsealData } from "iron-session"

const COOKIE_NAME = "process.env.COOKIE_NAME"
const COOKIE_PASSWORD = "process.env.SUPER_COOKIE_SECRETSUPER_COOKIE_SECRET"

export async function getRequestCookie(cookies: AstroCookies): Promise<{ login: string, avatar_url: string } | undefined> {
    const found = cookies.get(COOKIE_NAME)

    console.log("found =", found)
    if (!found?.value) return

    const data = await unsealData(found.value, {
        password: COOKIE_PASSWORD,
    })
    console.log("user =", data)
    return data as { login: string, avatar_url: string }
}

export async function setRequestCookie(cookies: AstroCookies, data: { login: string, avatar_url: string }) {
    const cookieName = 'process.env.COOKIE_NAME' as string

    const sealed = await sealData(data, {
        password: COOKIE_PASSWORD,
    })
    cookies.set(COOKIE_NAME, sealed, {
        // send cookie for every page
        path: '/',
        // server side only cookie so you can't use `document.cookie`
        httpOnly: true,
        // only requests from same site can send cookies
        // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
        sameSite: 'strict',
        // only sent over HTTPS in production
        secure: process.env.NODE_ENV === 'production',
        // set cookie to expire after two days
        maxAge: 60 * 60 * 24 * 2,
    })
    console.log("set =", cookies.get(COOKIE_NAME))
}
