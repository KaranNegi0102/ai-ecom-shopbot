import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectionDB from "../../../utils/dataBase/dbConnection";
import User from "@/app/utils/models/userModel";
import { ApiError, ApiSuccess } from "@/app/services/apiResponse";

export async function GET() {
  try {
    await connectionDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("AuthToken")?.value;

    if (!token) {
      return ApiError("Unauthorized", 401);
    }

    // console.log("this is token -> ",token);

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { userId: string; email: string };

    // console.log("this is decodedToken -> ",decodedToken);

    const existingUser = await User.findOne({ _id: decodedToken.userId });

    // console.log("existingUser --> ",existingUser.friends);

    if (!existingUser) {
      return ApiError("Unauthorized", 401);
    }

    const UserDataDetails = {
      userId: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      password: existingUser.password,
    };

    return ApiSuccess("user found successfully", UserDataDetails, 200);
  } catch (error: any) {
    console.log("error in checkUser --> ", error);
    return ApiError("Internal server error", 500);
  }
}
