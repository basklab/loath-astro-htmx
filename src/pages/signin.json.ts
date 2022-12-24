import type { APIContext } from 'astro';

// File routes export a get() function, which gets called to generate the file.
// Return an object with `body` to save the file contents in your final build.
export async function post({ params, request }: APIContext) {
  Astro.cookies()


  const formData = await request.formData();
  const item = formData.get("item")
  return {
    body: JSON.stringify({
     ololo: "Dasdas"
    })
  }
}





