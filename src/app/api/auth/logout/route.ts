import { NextRequest, NextResponse } from "next/server";
import connectionDB from "@/app/utils/dbbackend/connectionDB";
import { ApiError } from "@/app/services/apiResponse";
import jwt from "jsonwebtoken";
import User from "@/app/utils/models/userModel";

export async function GET(req: NextRequest) {
  try {
    await connectionDB();

    const token = req.cookies.get("AuthToken")?.value;
    if (!token) {
      return ApiError("Token not found");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      //upper type banane se badiya h aise bhej do
      userId: string;
      email: string;
    };

    const existingUser = await User.findById(decodedToken.userId);
    if (!existingUser) {
      return ApiError("user not found");
    }

    const response = NextResponse.json(
      {
        success: true,
        message: "user logged out successfully",
      },
      {
        status: 200,
      }
    );

    response.cookies.delete("AuthToken");
    return response;
  } catch (error: any) {
    console.log("error in the logout backend", error);
    return ApiError(error.message);
  }
}
