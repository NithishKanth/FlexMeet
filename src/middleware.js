import { clerkMiddleware, createRouteMatcher } 
from "@clerk/nextjs/server";

const Routes = createRouteMatcher([
    '/',
    '/upcoming',
    'recordings',
    'personal-room',
    'upcoming',
    'previous',
    'meeting(.*)'
])

export default clerkMiddleware((auth,req)=>{
    if(Routes(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};