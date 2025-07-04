import {NextResponse , NextRequest} from "next/server";

const protectedRoutes = ["/chatPage"];
const publicRoutes = ["/login","/register"];

export function middleware(req:NextRequest){
  const token = req.cookies.get("AuthToken")?.value;

  if(!token && protectedRoutes.includes(req.nextUrl.pathname)){
    return NextResponse.redirect(new URL("/",req.url));
  }
  if(token && publicRoutes.includes(req.nextUrl.pathname)){
    return NextResponse.redirect(new URL("/chatPage",req.url));
  }

  return NextResponse.next();
}

export const config ={
  matcher: ["/chatPage","/login","/register"],
}