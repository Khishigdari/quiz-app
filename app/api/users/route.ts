import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { clerkId, email, name } = await req.json();
    if (!clerkId) {
      return NextResponse.json({ error: "clerkId is required" });
    }
    if (!email) {
      return NextResponse.json({ error: "email is required" });
    }
    const findUser = await prisma.users.findUnique({
      where: { email },
    });

    if (findUser) {
      return NextResponse.json({
        error: "This email is alreagy registered",
      });
    }

    const newUser = await prisma.users.create({
      data: {
        clerkid: clerkId,
        email: email.toString(),
        name: name,
      },
    });
    // console.log(clerkUser, "clerkkkkkk dataaaaa");
    return NextResponse.json({ data: newUser });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ data: "" });
  }
};

export const GET = async () => {
  const users = await prisma.users.findMany();
  //   console.log(users, "clerkkkkkk users dataaaaa");
  return Response.json({ message: "success", users });
};
